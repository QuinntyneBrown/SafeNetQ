using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Payouts;

public record InitiatePayoutCommand(Guid RequestId, decimal Amount, PayoutMethod Method) : IRequest<PayoutDto>;

public class InitiatePayoutCommandHandler : IRequestHandler<InitiatePayoutCommand, PayoutDto>
{
    private readonly IPayoutRepository _payoutRepo;
    private readonly IAssistanceRequestRepository _requestRepo;
    private readonly IUnitOfWork _uow;

    public InitiatePayoutCommandHandler(IPayoutRepository payoutRepo, IAssistanceRequestRepository requestRepo, IUnitOfWork uow)
    {
        _payoutRepo = payoutRepo;
        _requestRepo = requestRepo;
        _uow = uow;
    }

    public async Task<PayoutDto> Handle(InitiatePayoutCommand request, CancellationToken ct)
    {
        var ar = await _requestRepo.GetByIdAsync(request.RequestId, ct)
            ?? throw new InvalidOperationException("Request not found");

        if (ar.Status != RequestStatus.Approved)
            throw new InvalidOperationException("Request must be approved before payout");

        var payout = new Payout
        {
            RequestId = request.RequestId,
            UserId = ar.UserId,
            Amount = request.Amount,
            Method = request.Method,
            Status = PayoutStatus.Pending
        };

        await _payoutRepo.AddAsync(payout, ct);
        ar.Status = RequestStatus.Paid;
        await _uow.SaveChangesAsync(ct);

        return new PayoutDto(payout.Id, payout.RequestId, payout.Amount, payout.Method, payout.Status, payout.Reference, payout.ProcessedAt);
    }
}
