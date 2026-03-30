using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Domain.Events;

public class UserRegisteredEvent : DomainEvent
{
    public Guid UserId { get; }
    public string Email { get; }
    public UserRegisteredEvent(Guid userId, string email) { UserId = userId; Email = email; }
}

public class KycVerificationCompletedEvent : DomainEvent
{
    public Guid UserId { get; }
    public KycStatus Status { get; }
    public KycVerificationCompletedEvent(Guid userId, KycStatus status) { UserId = userId; Status = status; }
}

public class AssistanceRequestSubmittedEvent : DomainEvent
{
    public Guid RequestId { get; }
    public Guid UserId { get; }
    public AssistanceRequestSubmittedEvent(Guid requestId, Guid userId) { RequestId = requestId; UserId = userId; }
}

public class AssistanceRequestApprovedEvent : DomainEvent
{
    public Guid RequestId { get; }
    public AssistanceRequestApprovedEvent(Guid requestId) { RequestId = requestId; }
}

public class PayoutProcessedEvent : DomainEvent
{
    public Guid PayoutId { get; }
    public Guid UserId { get; }
    public decimal Amount { get; }
    public PayoutProcessedEvent(Guid payoutId, Guid userId, decimal amount) { PayoutId = payoutId; UserId = userId; Amount = amount; }
}

public class ContributionProcessedEvent : DomainEvent
{
    public Guid ContributionId { get; }
    public Guid UserId { get; }
    public decimal Amount { get; }
    public ContributionProcessedEvent(Guid contributionId, Guid userId, decimal amount) { ContributionId = contributionId; UserId = userId; Amount = amount; }
}

public class MemberSuspendedEvent : DomainEvent
{
    public Guid UserId { get; }
    public string Reason { get; }
    public MemberSuspendedEvent(Guid userId, string reason) { UserId = userId; Reason = reason; }
}
