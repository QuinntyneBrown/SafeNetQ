using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.AssistanceRequests;

public record SubmitAppealCommand(Guid RequestId, string Reason) : IRequest<AppealDto>;

public class SubmitAppealCommandHandler : IRequestHandler<SubmitAppealCommand, AppealDto>
{
    private readonly IAppealRepository _appealRepo;
    private readonly IAssistanceRequestRepository _requestRepo;
    private readonly ICurrentUserService _currentUser;
    private readonly IUnitOfWork _uow;

    public SubmitAppealCommandHandler(IAppealRepository appealRepo, IAssistanceRequestRepository requestRepo, ICurrentUserService currentUser, IUnitOfWork uow)
    {
        _appealRepo = appealRepo;
        _requestRepo = requestRepo;
        _currentUser = currentUser;
        _uow = uow;
    }

    public async Task<AppealDto> Handle(SubmitAppealCommand request, CancellationToken ct)
    {
        _ = _currentUser.UserId ?? throw new UnauthorizedAccessException();

        var ar = await _requestRepo.GetByIdAsync(request.RequestId, ct)
            ?? throw new InvalidOperationException("Request not found");

        if (ar.Status != RequestStatus.Denied)
            throw new InvalidOperationException("Only denied requests can be appealed");

        ar.Status = RequestStatus.Appealed;
        var appeal = new Appeal { RequestId = request.RequestId, Reason = request.Reason };

        await _appealRepo.AddAsync(appeal, ct);
        await _uow.SaveChangesAsync(ct);

        return new AppealDto(appeal.Id, appeal.Reason, appeal.Status, appeal.CreatedAt);
    }
}
