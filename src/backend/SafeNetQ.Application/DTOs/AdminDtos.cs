using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record MemberListDto(IReadOnlyList<MemberDto> Members, int TotalCount, int Page, int PageSize);
public record MemberDto(Guid Id, string Email, string FullName, UserStatus Status, KycStatus KycStatus, DateTime CreatedAt);
public record SuspendMemberDto(Guid UserId, string Reason);
public record AuditEntryDto(Guid Id, Guid? UserId, string Action, string EntityType, Guid? EntityId, string? Details, string? IpAddress, DateTime CreatedAt);
public record AuditTrailDto(IReadOnlyList<AuditEntryDto> Entries, int TotalCount, int Page, int PageSize);
