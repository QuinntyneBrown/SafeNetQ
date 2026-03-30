using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Domain.Entities;

public class Appeal : BaseEntity
{
    public Guid RequestId { get; set; }
    public string Reason { get; set; } = string.Empty;
    public AppealStatus Status { get; set; } = AppealStatus.Submitted;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public AssistanceRequest Request { get; set; } = null!;
}
