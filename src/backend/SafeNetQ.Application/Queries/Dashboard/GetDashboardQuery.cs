using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Queries.Dashboard;

public record GetDashboardQuery : IRequest<DashboardDto>;

public class GetDashboardQueryHandler : IRequestHandler<GetDashboardQuery, DashboardDto>
{
    private readonly IUserRepository _userRepo;
    private readonly IContributionRepository _contribRepo;
    private readonly IAssistanceRequestRepository _requestRepo;
    private readonly IFeedEntryRepository _feedRepo;
    private readonly ICurrentUserService _currentUser;

    public GetDashboardQueryHandler(IUserRepository userRepo, IContributionRepository contribRepo, IAssistanceRequestRepository requestRepo, IFeedEntryRepository feedRepo, ICurrentUserService currentUser)
    {
        _userRepo = userRepo;
        _contribRepo = contribRepo;
        _requestRepo = requestRepo;
        _feedRepo = feedRepo;
        _currentUser = currentUser;
    }

    public async Task<DashboardDto> Handle(GetDashboardQuery request, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();
        var user = await _userRepo.GetByIdAsync(userId, ct) ?? throw new InvalidOperationException("User not found");

        var contributions = await _contribRepo.GetByUserIdAsync(userId, 1, 1, ct);
        var latestContrib = contributions.FirstOrDefault();

        var activeRequests = await _requestRepo.CountAsync(r => r.UserId == userId && r.Status != RequestStatus.Closed && r.Status != RequestStatus.Denied, ct);

        var feedEntries = await _feedRepo.GetAllAsync(ct);
        var recentFeed = feedEntries.OrderByDescending(f => f.CreatedAt).Take(10)
            .Select(f => new FeedEntryDto(f.Id, f.Category, f.AmountRange, f.Message, f.CreatedAt)).ToList();

        return new DashboardDto(
            user.Status,
            latestContrib?.Tier?.Name ?? "None",
            latestContrib?.Amount ?? 0m,
            activeRequests,
            0m,
            recentFeed);
    }
}
