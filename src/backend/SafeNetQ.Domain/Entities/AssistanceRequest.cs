using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Events;

namespace SafeNetQ.Domain.Entities;

public class AssistanceRequest : BaseEntity
{
    public Guid UserId { get; set; }
    public EmergencyCategory Category { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal RequestedAmount { get; set; }
    public RequestStatus Status { get; set; } = RequestStatus.Draft;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReviewedAt { get; set; }

    // Navigation
    public User User { get; set; } = null!;
    public ICollection<CommitteeVote> Votes { get; set; } = new List<CommitteeVote>();
    public ICollection<Appeal> Appeals { get; set; } = new List<Appeal>();
    public ICollection<Document> Documents { get; set; } = new List<Document>();
    public Payout? Payout { get; set; }

    public void Submit()
    {
        Status = RequestStatus.Submitted;
        AddDomainEvent(new AssistanceRequestSubmittedEvent(Id, UserId));
    }

    public void Approve()
    {
        Status = RequestStatus.Approved;
        ReviewedAt = DateTime.UtcNow;
        AddDomainEvent(new AssistanceRequestApprovedEvent(Id));
    }

    public void Deny()
    {
        Status = RequestStatus.Denied;
        ReviewedAt = DateTime.UtcNow;
    }
}
