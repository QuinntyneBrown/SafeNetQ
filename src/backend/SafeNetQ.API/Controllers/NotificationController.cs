using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/notifications")]
[Authorize]
public class NotificationController : ControllerBase
{
    private readonly INotificationRepository _notifRepo;
    private readonly ICurrentUserService _currentUser;

    public NotificationController(INotificationRepository notifRepo, ICurrentUserService currentUser)
    {
        _notifRepo = notifRepo;
        _currentUser = currentUser;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<NotificationDto>>> GetNotifications(CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();
        var notifications = await _notifRepo.GetByUserIdAsync(userId, ct);
        var dtos = notifications.Select(n => new NotificationDto(n.Id, n.Type, n.Title, n.Body, n.Channel, n.Status, n.SentAt)).ToList();
        return Ok(dtos);
    }

    [HttpPut("preferences")]
    public ActionResult UpdatePreferences([FromBody] NotificationPreferencesDto dto)
    {
        // Placeholder: store notification preferences
        return Ok(new { message = "Preferences updated" });
    }
}
