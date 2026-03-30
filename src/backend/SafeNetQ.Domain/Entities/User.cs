using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Events;

namespace SafeNetQ.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserStatus Status { get; set; } = UserStatus.Pending;
    public KycStatus KycStatus { get; set; } = KycStatus.NotStarted;
    public bool MfaEnabled { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    public KycVerification? KycVerification { get; set; }
    public ICollection<Contribution> Contributions { get; set; } = new List<Contribution>();
    public ICollection<PaymentMethod> PaymentMethods { get; set; } = new List<PaymentMethod>();
    public ICollection<AssistanceRequest> AssistanceRequests { get; set; } = new List<AssistanceRequest>();
    public ICollection<Document> Documents { get; set; } = new List<Document>();
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    public ICollection<AuditEntry> AuditEntries { get; set; } = new List<AuditEntry>();
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    public void Register()
    {
        Status = UserStatus.Pending;
        CreatedAt = DateTime.UtcNow;
        AddDomainEvent(new UserRegisteredEvent(Id, Email));
    }

    public void Suspend(string reason)
    {
        Status = UserStatus.Suspended;
        UpdatedAt = DateTime.UtcNow;
        AddDomainEvent(new MemberSuspendedEvent(Id, reason));
    }

    public void Activate()
    {
        Status = UserStatus.Active;
        UpdatedAt = DateTime.UtcNow;
    }
}
