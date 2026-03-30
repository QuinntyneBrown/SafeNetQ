using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Domain.Entities;

public class Payout : BaseEntity
{
    public Guid RequestId { get; set; }
    public Guid UserId { get; set; }
    public decimal Amount { get; set; }
    public PayoutMethod Method { get; set; }
    public PayoutStatus Status { get; set; } = PayoutStatus.Pending;
    public string? Reference { get; set; }
    public DateTime? ProcessedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public AssistanceRequest Request { get; set; } = null!;
    public User User { get; set; } = null!;
}
