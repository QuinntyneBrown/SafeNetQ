using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Domain.Entities;

public class Contribution : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid TierId { get; set; }
    public decimal Amount { get; set; }
    public decimal TrustPortion { get; set; }
    public decimal ReservePortion { get; set; }
    public decimal PlatformFeePortion { get; set; }
    public ContributionStatus Status { get; set; } = ContributionStatus.Active;
    public Guid? PaymentMethodId { get; set; }
    public DateTime BillingDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
    public ContributionTier Tier { get; set; } = null!;
    public PaymentMethod? PaymentMethod { get; set; }
}
