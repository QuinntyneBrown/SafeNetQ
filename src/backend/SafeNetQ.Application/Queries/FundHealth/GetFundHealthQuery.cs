using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Queries.FundHealth;

public record GetFundHealthQuery : IRequest<FundHealthDto>;

public class GetFundHealthQueryHandler : IRequestHandler<GetFundHealthQuery, FundHealthDto>
{
    private readonly IFundAccountRepository _fundRepo;
    private readonly IUserRepository _userRepo;

    public GetFundHealthQueryHandler(IFundAccountRepository fundRepo, IUserRepository userRepo)
    {
        _fundRepo = fundRepo;
        _userRepo = userRepo;
    }

    public async Task<FundHealthDto> Handle(GetFundHealthQuery request, CancellationToken ct)
    {
        var trust = await _fundRepo.GetByTypeAsync(FundAccountType.Trust, ct);
        var reserve = await _fundRepo.GetByTypeAsync(FundAccountType.Reserve, ct);
        var operating = await _fundRepo.GetByTypeAsync(FundAccountType.Operating, ct);
        var totalMembers = await _userRepo.CountAsync(u => u.Status == UserStatus.Active, ct);

        return new FundHealthDto(
            trust?.Balance ?? 0m,
            reserve?.Balance ?? 0m,
            operating?.Balance ?? 0m,
            totalMembers,
            0m, 0m, 0m);
    }
}

public record GetFundBalancesQuery : IRequest<IReadOnlyList<FundBalanceDto>>;

public class GetFundBalancesQueryHandler : IRequestHandler<GetFundBalancesQuery, IReadOnlyList<FundBalanceDto>>
{
    private readonly IFundAccountRepository _fundRepo;

    public GetFundBalancesQueryHandler(IFundAccountRepository fundRepo) => _fundRepo = fundRepo;

    public async Task<IReadOnlyList<FundBalanceDto>> Handle(GetFundBalancesQuery request, CancellationToken ct)
    {
        var accounts = await _fundRepo.GetAllAsync(ct);
        return accounts.Select(a => new FundBalanceDto(a.Id, a.Type.ToString(), a.Balance, a.LastReconciled)).ToList();
    }
}
