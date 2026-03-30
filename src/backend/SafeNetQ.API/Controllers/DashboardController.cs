using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Queries.Dashboard;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IMediator _mediator;

    public DashboardController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<DashboardDto>> GetDashboard(CancellationToken ct)
    {
        var result = await _mediator.Send(new GetDashboardQuery(), ct);
        return Ok(result);
    }
}
