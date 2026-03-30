using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Contributions;

public record ChangeTierCommand(Guid NewTierId) : IRequest<ContributionTierDto>;

public class ChangeTierCommandHandler : IRequestHandler<ChangeTierCommand, ContributionTierDto>
{
    private readonly IContributionTierRepository _tierRepo;
    private readonly ICurrentUserService _currentUser;

    public ChangeTierCommandHandler(IContributionTierRepository tierRepo, ICurrentUserService currentUser)
    {
        _tierRepo = tierRepo;
        _currentUser = currentUser;
    }

    public async Task<ContributionTierDto> Handle(ChangeTierCommand request, CancellationToken ct)
    {
        _ = _currentUser.UserId ?? throw new UnauthorizedAccessException();
        var tier = await _tierRepo.GetByIdAsync(request.NewTierId, ct)
            ?? throw new InvalidOperationException("Tier not found");

        return new ContributionTierDto(tier.Id, tier.Name, tier.MonthlyAmount, tier.MaxPayoutPerEvent, tier.MaxPayoutsPerYear);
    }
}
