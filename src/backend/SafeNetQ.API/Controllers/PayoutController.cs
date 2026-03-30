using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.Commands.Payouts;
using SafeNetQ.Application.DTOs;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/payouts")]
[Authorize]
public class PayoutController : ControllerBase
{
    private readonly IMediator _mediator;

    public PayoutController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public ActionResult GetPayouts()
    {
        // Placeholder: query payouts for user
        return Ok(new { message = "Payouts list endpoint" });
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<PayoutDto>> InitiatePayout([FromBody] InitiatePayoutDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new InitiatePayoutCommand(dto.RequestId, dto.Amount, dto.Method), ct);
        return Ok(result);
    }
}
