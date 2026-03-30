using MediatR;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Admin;

public record SuspendMemberCommand(Guid UserId, string Reason) : IRequest<Unit>;

public class SuspendMemberCommandHandler : IRequestHandler<SuspendMemberCommand, Unit>
{
    private readonly IUserRepository _userRepo;
    private readonly IUnitOfWork _uow;

    public SuspendMemberCommandHandler(IUserRepository userRepo, IUnitOfWork uow)
    {
        _userRepo = userRepo;
        _uow = uow;
    }

    public async Task<Unit> Handle(SuspendMemberCommand request, CancellationToken ct)
    {
        var user = await _userRepo.GetByIdAsync(request.UserId, ct)
            ?? throw new InvalidOperationException("User not found");

        user.Suspend(request.Reason);
        await _userRepo.UpdateAsync(user, ct);
        await _uow.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
