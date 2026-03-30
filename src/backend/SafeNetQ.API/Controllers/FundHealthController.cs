using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Queries.FundHealth;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/fund")]
[Authorize]
public class FundHealthController : ControllerBase
{
    private readonly IMediator _mediator;

    public FundHealthController(IMediator mediator) => _mediator = mediator;

    [HttpGet("health")]
    public async Task<ActionResult<FundHealthDto>> GetHealth(CancellationToken ct)
    {
        var result = await _mediator.Send(new GetFundHealthQuery(), ct);
        return Ok(result);
    }

    [HttpGet("balances")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IReadOnlyList<FundBalanceDto>>> GetBalances(CancellationToken ct)
    {
        var result = await _mediator.Send(new GetFundBalancesQuery(), ct);
        return Ok(result);
    }
}
