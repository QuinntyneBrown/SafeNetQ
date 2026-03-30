using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.Commands.Kyc;
using SafeNetQ.Application.DTOs;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/kyc")]
[Authorize]
public class KycController : ControllerBase
{
    private readonly IMediator _mediator;

    public KycController(IMediator mediator) => _mediator = mediator;

    [HttpPost("submit")]
    public async Task<ActionResult<KycStatusDto>> Submit([FromBody] SubmitKycDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new SubmitKycCommand(dto.IdType, dto.DocumentUrl, dto.SelfieUrl), ct);
        return Ok(result);
    }

    [HttpGet("status")]
    public ActionResult<KycStatusDto> GetStatus()
    {
        // Placeholder: query KYC status
        return Ok(new { message = "KYC status endpoint" });
    }
}
