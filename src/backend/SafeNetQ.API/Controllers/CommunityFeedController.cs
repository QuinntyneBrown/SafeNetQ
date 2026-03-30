using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Queries.CommunityFeed;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/feed")]
[Authorize]
public class CommunityFeedController : ControllerBase
{
    private readonly IMediator _mediator;

    public CommunityFeedController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<FeedEntryDto>>> GetFeed([FromQuery] int page = 1, [FromQuery] int pageSize = 20, CancellationToken ct = default)
    {
        var result = await _mediator.Send(new GetCommunityFeedQuery(page, pageSize), ct);
        return Ok(result);
    }
}
