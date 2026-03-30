using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.Commands.AssistanceRequests;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Queries.AssistanceRequests;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/requests")]
[Authorize]
public class AssistanceRequestController : ControllerBase
{
    private readonly IMediator _mediator;

    public AssistanceRequestController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<ActionResult<AssistanceRequestDto>> Submit([FromBody] CreateAssistanceRequestDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new SubmitAssistanceRequestCommand(dto.Category, dto.Description, dto.RequestedAmount), ct);
        return CreatedAtAction(nameof(GetDetails), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AssistanceRequestDetailDto>> GetDetails(Guid id, CancellationToken ct)
    {
        var result = await _mediator.Send(new GetRequestDetailsQuery(id), ct);
        return Ok(result);
    }

    [HttpPost("{id:guid}/vote")]
    [Authorize(Roles = "CommitteeMember,Admin")]
    public async Task<ActionResult<VoteDto>> Vote(Guid id, [FromBody] CastVoteDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new CastVoteCommand(id, dto.Vote, dto.Justification), ct);
        return Ok(result);
    }

    [HttpPost("{id:guid}/appeal")]
    public async Task<ActionResult<AppealDto>> Appeal(Guid id, [FromBody] SubmitAppealDto dto, CancellationToken ct)
    {
        var result = await _mediator.Send(new SubmitAppealCommand(id, dto.Reason), ct);
        return Ok(result);
    }
}
