using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record NotificationDto(Guid Id, NotificationType Type, string Title, string Body, NotificationChannel Channel, string Status, DateTime? SentAt);
public record NotificationPreferencesDto(bool EmailEnabled, bool SmsEnabled, bool PushEnabled);
