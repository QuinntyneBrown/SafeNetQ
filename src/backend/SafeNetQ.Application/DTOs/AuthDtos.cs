namespace SafeNetQ.Application.DTOs;

public record RegisterDto(string Email, string FirstName, string LastName, string Phone, string Password);
public record LoginDto(string Email, string Password);
public record AuthTokensDto(string AccessToken, string RefreshToken, DateTime ExpiresAt);
public record RefreshTokenDto(string RefreshToken);
public record ResetPasswordDto(string Email);
