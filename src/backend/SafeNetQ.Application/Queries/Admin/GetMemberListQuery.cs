using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Queries.Admin;

public record GetMemberListQuery(int Page = 1, int PageSize = 20) : IRequest<MemberListDto>;

public class GetMemberListQueryHandler : IRequestHandler<GetMemberListQuery, MemberListDto>
{
    private readonly IUserRepository _userRepo;

    public GetMemberListQueryHandler(IUserRepository userRepo) => _userRepo = userRepo;

    public async Task<MemberListDto> Handle(GetMemberListQuery request, CancellationToken ct)
    {
        var users = await _userRepo.GetAllAsync(ct);
        var totalCount = users.Count;
        var paged = users
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(u => new MemberDto(u.Id, u.Email, $"{u.FirstName} {u.LastName}", u.Status, u.KycStatus, u.CreatedAt))
            .ToList();

        return new MemberListDto(paged, totalCount, request.Page, request.PageSize);
    }
}

public record GetAuditTrailQuery(int Page = 1, int PageSize = 50, string? Action = null, Guid? UserId = null) : IRequest<AuditTrailDto>;

public class GetAuditTrailQueryHandler : IRequestHandler<GetAuditTrailQuery, AuditTrailDto>
{
    private readonly IAuditEntryRepository _auditRepo;

    public GetAuditTrailQueryHandler(IAuditEntryRepository auditRepo) => _auditRepo = auditRepo;

    public async Task<AuditTrailDto> Handle(GetAuditTrailQuery request, CancellationToken ct)
    {
        var entries = await _auditRepo.GetAllAsync(ct);
        var filtered = entries.AsEnumerable();

        if (!string.IsNullOrEmpty(request.Action))
            filtered = filtered.Where(e => e.Action == request.Action);
        if (request.UserId.HasValue)
            filtered = filtered.Where(e => e.UserId == request.UserId);

        var list = filtered.OrderByDescending(e => e.CreatedAt).ToList();
        var paged = list
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(e => new AuditEntryDto(e.Id, e.UserId, e.Action, e.EntityType, e.EntityId, e.Details, e.IpAddress, e.CreatedAt))
            .ToList();

        return new AuditTrailDto(paged, list.Count, request.Page, request.PageSize);
    }
}

public record GetPendingReviewsQuery : IRequest<IReadOnlyList<AssistanceRequestDto>>;

public class GetPendingReviewsQueryHandler : IRequestHandler<GetPendingReviewsQuery, IReadOnlyList<AssistanceRequestDto>>
{
    private readonly IAssistanceRequestRepository _requestRepo;

    public GetPendingReviewsQueryHandler(IAssistanceRequestRepository requestRepo) => _requestRepo = requestRepo;

    public async Task<IReadOnlyList<AssistanceRequestDto>> Handle(GetPendingReviewsQuery request, CancellationToken ct)
    {
        var pending = await _requestRepo.GetPendingReviewsAsync(ct);
        return pending.Select(r => new AssistanceRequestDto(r.Id, r.Category, r.Description, r.RequestedAmount, r.Status, r.CreatedAt, r.ReviewedAt)).ToList();
    }
}
