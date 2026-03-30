using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.AssistanceRequests;

public record SubmitAssistanceRequestCommand(EmergencyCategory Category, string Description, decimal RequestedAmount) : IRequest<AssistanceRequestDto>;

public class SubmitAssistanceRequestCommandHandler : IRequestHandler<SubmitAssistanceRequestCommand, AssistanceRequestDto>
{
    private readonly IAssistanceRequestRepository _requestRepo;
    private readonly ICurrentUserService _currentUser;
    private readonly IUnitOfWork _uow;

    public SubmitAssistanceRequestCommandHandler(IAssistanceRequestRepository requestRepo, ICurrentUserService currentUser, IUnitOfWork uow)
    {
        _requestRepo = requestRepo;
        _currentUser = currentUser;
        _uow = uow;
    }

    public async Task<AssistanceRequestDto> Handle(SubmitAssistanceRequestCommand request, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();

        var ar = new AssistanceRequest
        {
            UserId = userId,
            Category = request.Category,
            Description = request.Description,
            RequestedAmount = request.RequestedAmount
        };
        ar.Submit();

        await _requestRepo.AddAsync(ar, ct);
        await _uow.SaveChangesAsync(ct);

        return new AssistanceRequestDto(ar.Id, ar.Category, ar.Description, ar.RequestedAmount, ar.Status, ar.CreatedAt, ar.ReviewedAt);
    }
}
