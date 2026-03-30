using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record ProfileDto(Guid Id, string Email, string FirstName, string LastName, string Phone, UserStatus Status, KycStatus KycStatus, bool MfaEnabled, DateTime CreatedAt);
public record UpdateProfileDto(string? FirstName, string? LastName, string? Phone);
