using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record CreateAssistanceRequestDto(EmergencyCategory Category, string Description, decimal RequestedAmount);
public record AssistanceRequestDto(Guid Id, EmergencyCategory Category, string Description, decimal RequestedAmount, RequestStatus Status, DateTime CreatedAt, DateTime? ReviewedAt);
public record AssistanceRequestDetailDto(Guid Id, EmergencyCategory Category, string Description, decimal RequestedAmount, RequestStatus Status, DateTime CreatedAt, DateTime? ReviewedAt, IReadOnlyList<VoteDto> Votes, IReadOnlyList<AppealDto> Appeals);
public record VoteDto(Guid Id, Guid CommitteeMemberId, string CommitteeMemberName, VoteDecision Vote, string Justification, DateTime CreatedAt);
public record CastVoteDto(VoteDecision Vote, string Justification);
public record AppealDto(Guid Id, string Reason, AppealStatus Status, DateTime CreatedAt);
public record SubmitAppealDto(string Reason);
