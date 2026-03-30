using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Contributions;

public record SetupPaymentMethodCommand(PaymentMethodType Type, string StripePaymentMethodId) : IRequest<PaymentMethodDto>;

public class SetupPaymentMethodCommandHandler : IRequestHandler<SetupPaymentMethodCommand, PaymentMethodDto>
{
    private readonly IPaymentMethodRepository _pmRepo;
    private readonly ICurrentUserService _currentUser;
    private readonly IUnitOfWork _uow;

    public SetupPaymentMethodCommandHandler(IPaymentMethodRepository pmRepo, ICurrentUserService currentUser, IUnitOfWork uow)
    {
        _pmRepo = pmRepo;
        _currentUser = currentUser;
        _uow = uow;
    }

    public async Task<PaymentMethodDto> Handle(SetupPaymentMethodCommand request, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();

        var existing = await _pmRepo.GetByUserIdAsync(userId, ct);
        var isDefault = !existing.Any();

        var pm = new PaymentMethod
        {
            UserId = userId,
            Type = request.Type,
            Last4 = request.StripePaymentMethodId[^4..],
            StripePaymentMethodId = request.StripePaymentMethodId,
            IsDefault = isDefault
        };

        await _pmRepo.AddAsync(pm, ct);
        await _uow.SaveChangesAsync(ct);

        return new PaymentMethodDto(pm.Id, pm.Type, pm.Last4, pm.ExpiryMonth, pm.ExpiryYear, pm.IsDefault);
    }
}
