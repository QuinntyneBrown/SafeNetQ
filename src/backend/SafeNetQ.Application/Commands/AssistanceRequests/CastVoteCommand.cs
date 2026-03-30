using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.AssistanceRequests;

public record CastVoteCommand(Guid RequestId, VoteDecision Vote, string Justification) : IRequest<VoteDto>;

public class CastVoteCommandHandler : IRequestHandler<CastVoteCommand, VoteDto>
{
    private readonly ICommitteeVoteRepository _voteRepo;
    private readonly IAssistanceRequestRepository _requestRepo;
    private readonly ICurrentUserService _currentUser;
    private readonly IUnitOfWork _uow;

    public CastVoteCommandHandler(ICommitteeVoteRepository voteRepo, IAssistanceRequestRepository requestRepo, ICurrentUserService currentUser, IUnitOfWork uow)
    {
        _voteRepo = voteRepo;
        _requestRepo = requestRepo;
        _currentUser = currentUser;
        _uow = uow;
    }

    public async Task<VoteDto> Handle(CastVoteCommand request, CancellationToken ct)
    {
        var memberId = _currentUser.UserId ?? throw new UnauthorizedAccessException();

        var ar = await _requestRepo.GetByIdAsync(request.RequestId, ct)
            ?? throw new InvalidOperationException("Request not found");

        var vote = new CommitteeVote
        {
            RequestId = request.RequestId,
            CommitteeMemberId = memberId,
            Vote = request.Vote,
            Justification = request.Justification
        };

        await _voteRepo.AddAsync(vote, ct);

        // Check if enough votes to decide
        var votes = await _voteRepo.GetByRequestIdAsync(request.RequestId, ct);
        var approveCount = votes.Count(v => v.Vote == VoteDecision.Approve) + (request.Vote == VoteDecision.Approve ? 1 : 0);
        var denyCount = votes.Count(v => v.Vote == VoteDecision.Deny) + (request.Vote == VoteDecision.Deny ? 1 : 0);

        if (approveCount >= 3) ar.Approve();
        else if (denyCount >= 3) ar.Deny();

        await _uow.SaveChangesAsync(ct);

        return new VoteDto(vote.Id, memberId, string.Empty, vote.Vote, vote.Justification, vote.CreatedAt);
    }
}
