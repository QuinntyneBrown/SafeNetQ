using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record PayoutDto(Guid Id, Guid RequestId, decimal Amount, PayoutMethod Method, PayoutStatus Status, string? Reference, DateTime? ProcessedAt);
public record InitiatePayoutDto(Guid RequestId, decimal Amount, PayoutMethod Method);
