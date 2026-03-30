using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Auth;

public record RegisterCommand(string Email, string FirstName, string LastName, string Phone, string Password) : IRequest<AuthTokensDto>;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthTokensDto>
{
    private readonly IUserRepository _userRepo;
    private readonly IUnitOfWork _uow;
    private readonly IPasswordHasher _hasher;
    private readonly IJwtTokenService _jwt;
    private readonly IEmailService _email;

    public RegisterCommandHandler(IUserRepository userRepo, IUnitOfWork uow, IPasswordHasher hasher, IJwtTokenService jwt, IEmailService email)
    {
        _userRepo = userRepo;
        _uow = uow;
        _hasher = hasher;
        _jwt = jwt;
        _email = email;
    }

    public async Task<AuthTokensDto> Handle(RegisterCommand request, CancellationToken ct)
    {
        if (await _userRepo.EmailExistsAsync(request.Email, ct))
            throw new InvalidOperationException("Email already registered");

        var user = new User
        {
            Email = request.Email.Trim().ToLowerInvariant(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Phone = request.Phone,
            PasswordHash = _hasher.Hash(request.Password)
        };
        user.Register();

        await _userRepo.AddAsync(user, ct);
        await _uow.SaveChangesAsync(ct);

        await _email.SendAsync(user.Email, "Welcome to SafeNetQ", $"Hello {user.FirstName}, welcome!", ct);

        var accessToken = _jwt.GenerateAccessToken(user.Id, user.Email, Array.Empty<string>());
        var refreshToken = _jwt.GenerateRefreshToken();

        return new AuthTokensDto(accessToken, refreshToken, DateTime.UtcNow.AddHours(1));
    }
}
