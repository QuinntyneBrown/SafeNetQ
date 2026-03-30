using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Queries.Contributions;

public record GetContributionHistoryQuery(int Page = 1, int PageSize = 20) : IRequest<ContributionHistoryDto>;

public class GetContributionHistoryQueryHandler : IRequestHandler<GetContributionHistoryQuery, ContributionHistoryDto>
{
    private readonly IContributionRepository _contribRepo;
    private readonly ICurrentUserService _currentUser;

    public GetContributionHistoryQueryHandler(IContributionRepository contribRepo, ICurrentUserService currentUser)
    {
        _contribRepo = contribRepo;
        _currentUser = currentUser;
    }

    public async Task<ContributionHistoryDto> Handle(GetContributionHistoryQuery request, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();

        var items = await _contribRepo.GetByUserIdAsync(userId, request.Page, request.PageSize, ct);
        var totalCount = await _contribRepo.CountAsync(c => c.UserId == userId, ct);

        var dtos = items.Select(c => new ContributionDto(
            c.Id, c.Amount, c.TrustPortion, c.ReservePortion, c.PlatformFeePortion,
            c.Status, c.BillingDate, c.Tier?.Name ?? string.Empty)).ToList();

        return new ContributionHistoryDto(dtos, totalCount, request.Page, request.PageSize);
    }
}
