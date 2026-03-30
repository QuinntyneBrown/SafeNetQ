using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Auth;

public record LoginCommand(string Email, string Password) : IRequest<AuthTokensDto>;

public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthTokensDto>
{
    private readonly IUserRepository _userRepo;
    private readonly IPasswordHasher _hasher;
    private readonly IJwtTokenService _jwt;

    public LoginCommandHandler(IUserRepository userRepo, IPasswordHasher hasher, IJwtTokenService jwt)
    {
        _userRepo = userRepo;
        _hasher = hasher;
        _jwt = jwt;
    }

    public async Task<AuthTokensDto> Handle(LoginCommand request, CancellationToken ct)
    {
        var user = await _userRepo.GetByEmailAsync(request.Email.Trim().ToLowerInvariant(), ct)
            ?? throw new UnauthorizedAccessException("Invalid credentials");

        if (!_hasher.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");

        if (user.Status == Domain.Enums.UserStatus.Suspended)
            throw new UnauthorizedAccessException("Account is suspended");

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var accessToken = _jwt.GenerateAccessToken(user.Id, user.Email, roles);
        var refreshToken = _jwt.GenerateRefreshToken();

        return new AuthTokensDto(accessToken, refreshToken, DateTime.UtcNow.AddHours(1));
    }
}
