using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Queries.AssistanceRequests;

public record GetRequestDetailsQuery(Guid RequestId) : IRequest<AssistanceRequestDetailDto>;

public class GetRequestDetailsQueryHandler : IRequestHandler<GetRequestDetailsQuery, AssistanceRequestDetailDto>
{
    private readonly IAssistanceRequestRepository _requestRepo;

    public GetRequestDetailsQueryHandler(IAssistanceRequestRepository requestRepo)
    {
        _requestRepo = requestRepo;
    }

    public async Task<AssistanceRequestDetailDto> Handle(GetRequestDetailsQuery request, CancellationToken ct)
    {
        var ar = await _requestRepo.GetWithDetailsAsync(request.RequestId, ct)
            ?? throw new InvalidOperationException("Request not found");

        var votes = ar.Votes.Select(v => new VoteDto(v.Id, v.CommitteeMemberId,
            v.CommitteeMember?.FirstName + " " + v.CommitteeMember?.LastName,
            v.Vote, v.Justification, v.CreatedAt)).ToList();

        var appeals = ar.Appeals.Select(a => new AppealDto(a.Id, a.Reason, a.Status, a.CreatedAt)).ToList();

        return new AssistanceRequestDetailDto(ar.Id, ar.Category, ar.Description, ar.RequestedAmount,
            ar.Status, ar.CreatedAt, ar.ReviewedAt, votes, appeals);
    }
}
