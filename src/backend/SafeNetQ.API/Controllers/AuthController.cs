using MediatR;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.Commands.Auth;
using SafeNetQ.Application.DTOs;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator) => _mediator = mediator;

    [HttpPost("register")]
    public async Task<ActionResult<AuthTokensDto>> Register([FromBody] RegisterDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new RegisterCommand(dto.Email, dto.FirstName, dto.LastName, dto.Phone, dto.Password), ct);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthTokensDto>> Login([FromBody] LoginDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new LoginCommand(dto.Email, dto.Password), ct);
        return Ok(result);
    }

    [HttpPost("refresh")]
    public ActionResult Refresh([FromBody] RefreshTokenDto dto)
    {
        // Placeholder: validate refresh token and issue new tokens
        return Ok(new { message = "Refresh token endpoint" });
    }

    [HttpPost("reset-password")]
    public ActionResult ResetPassword([FromBody] ResetPasswordDto dto)
    {
        // Placeholder: send reset email
        return Ok(new { message = "Password reset email sent" });
    }
}
