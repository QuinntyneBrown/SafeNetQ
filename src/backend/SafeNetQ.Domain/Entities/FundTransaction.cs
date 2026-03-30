using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Domain.Entities;

public class FundTransaction : BaseEntity
{
    public Guid AccountId { get; set; }
    public decimal Amount { get; set; }
    public FundTransactionType Type { get; set; }
    public string Description { get; set; } = string.Empty;
    public Guid? RelatedEntityId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public FundAccount Account { get; set; } = null!;
}
