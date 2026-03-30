using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record DashboardDto(
    UserStatus MemberStatus,
    string CurrentTier,
    decimal MonthlyContribution,
    int ActiveRequestsCount,
    decimal TotalPaidOut,
    IReadOnlyList<FeedEntryDto> RecentFeedEntries);
