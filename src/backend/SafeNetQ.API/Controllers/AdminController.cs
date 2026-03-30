using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeNetQ.Application.Commands.Admin;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Queries.Admin;

namespace SafeNetQ.API.Controllers;

[ApiController]
[Route("api/v1/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminController(IMediator mediator) => _mediator = mediator;

    [HttpGet("members")]
    public async Task<ActionResult<MemberListDto>> GetMembers([FromQuery] int page = 1, [FromQuery] int pageSize = 20, CancellationToken ct = default)
    {
        var result = await _mediator.Send(new GetMemberListQuery(page, pageSize), ct);
        return Ok(result);
    }

    [HttpPost("suspend")]
    public async Task<ActionResult> SuspendMember([FromBody] SuspendMemberDto dto, CancellationToken ct)
    {
        await _mediator.Send(new SuspendMemberCommand(dto.UserId, dto.Reason), ct);
        return Ok(new { message = "Member suspended" });
    }

    [HttpGet("audit-trail")]
    public async Task<ActionResult<AuditTrailDto>> GetAuditTrail([FromQuery] int page = 1, [FromQuery] int pageSize = 50, [FromQuery] string? action = null, [FromQuery] Guid? userId = null, CancellationToken ct = default)
    {
        var result = await _mediator.Send(new GetAuditTrailQuery(page, pageSize, action, userId), ct);
        return Ok(result);
    }

    [HttpGet("pending-reviews")]
    [Authorize(Roles = "CommitteeMember,Admin")]
    public async Task<ActionResult<IReadOnlyList<AssistanceRequestDto>>> GetPendingReviews(CancellationToken ct)
    {
        var result = await _mediator.Send(new GetPendingReviewsQuery(), ct);
        return Ok(result);
    }
}
