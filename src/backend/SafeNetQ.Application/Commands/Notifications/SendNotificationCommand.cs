using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Notifications;

public record SendNotificationCommand(Guid UserId, NotificationType Type, string Title, string Body, NotificationChannel Channel) : IRequest<NotificationDto>;

public class SendNotificationCommandHandler : IRequestHandler<SendNotificationCommand, NotificationDto>
{
    private readonly INotificationRepository _notifRepo;
    private readonly IUnitOfWork _uow;

    public SendNotificationCommandHandler(INotificationRepository notifRepo, IUnitOfWork uow)
    {
        _notifRepo = notifRepo;
        _uow = uow;
    }

    public async Task<NotificationDto> Handle(SendNotificationCommand request, CancellationToken ct)
    {
        var notification = new Notification
        {
            UserId = request.UserId,
            Type = request.Type,
            Title = request.Title,
            Body = request.Body,
            Channel = request.Channel,
            Status = "Sent",
            SentAt = DateTime.UtcNow
        };

        await _notifRepo.AddAsync(notification, ct);
        await _uow.SaveChangesAsync(ct);

        return new NotificationDto(notification.Id, notification.Type, notification.Title, notification.Body, notification.Channel, notification.Status, notification.SentAt);
    }
}
