using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Domain.Entities;

public class KycVerification : BaseEntity
{
    public Guid UserId { get; set; }
    public IdDocumentType IdType { get; set; }
    public string DocumentUrl { get; set; } = string.Empty;
    public string SelfieUrl { get; set; } = string.Empty;
    public KycStatus Status { get; set; } = KycStatus.Pending;
    public decimal? ConfidenceScore { get; set; }
    public DateTime? VerifiedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
}
