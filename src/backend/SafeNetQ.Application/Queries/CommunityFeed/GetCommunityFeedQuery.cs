using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Queries.CommunityFeed;

public record GetCommunityFeedQuery(int Page = 1, int PageSize = 20) : IRequest<IReadOnlyList<FeedEntryDto>>;

public class GetCommunityFeedQueryHandler : IRequestHandler<GetCommunityFeedQuery, IReadOnlyList<FeedEntryDto>>
{
    private readonly IFeedEntryRepository _feedRepo;

    public GetCommunityFeedQueryHandler(IFeedEntryRepository feedRepo)
    {
        _feedRepo = feedRepo;
    }

    public async Task<IReadOnlyList<FeedEntryDto>> Handle(GetCommunityFeedQuery request, CancellationToken ct)
    {
        var entries = await _feedRepo.GetAllAsync(ct);
        return entries
            .OrderByDescending(f => f.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(f => new FeedEntryDto(f.Id, f.Category, f.AmountRange, f.Message, f.CreatedAt))
            .ToList();
    }
}
