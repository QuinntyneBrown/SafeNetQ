using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record FeedEntryDto(Guid Id, EmergencyCategory Category, string? AmountRange, string Message, DateTime CreatedAt);
