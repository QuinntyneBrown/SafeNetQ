using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.Commands.Contributions;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Queries.Contributions;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/contributions")]
[Authorize]
public class ContributionController : ControllerBase
{
    private readonly IMediator _mediator;

    public ContributionController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<ContributionHistoryDto>> GetHistory([FromQuery] int page = 1, [FromQuery] int pageSize = 20, CancellationToken ct = default)
    {
        var result = await _mediator.Send(new GetContributionHistoryQuery(page, pageSize), ct);
        return Ok(result);
    }

    [HttpPost("setup-payment")]
    public async Task<ActionResult<PaymentMethodDto>> SetupPayment([FromBody] SetupPaymentMethodDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new SetupPaymentMethodCommand(dto.Type, dto.StripePaymentMethodId), ct);
        return Ok(result);
    }

    [HttpPut("change-tier")]
    public async Task<ActionResult<ContributionTierDto>> ChangeTier([FromBody] ChangeTierDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new ChangeTierCommand(dto.NewTierId), ct);
        return Ok(result);
    }
}
