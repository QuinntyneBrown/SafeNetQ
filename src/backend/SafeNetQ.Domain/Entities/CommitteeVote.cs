using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Domain.Entities;

public class CommitteeVote : BaseEntity
{
    public Guid RequestId { get; set; }
    public Guid CommitteeMemberId { get; set; }
    public VoteDecision Vote { get; set; }
    public string Justification { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public AssistanceRequest Request { get; set; } = null!;
    public User CommitteeMember { get; set; } = null!;
}
