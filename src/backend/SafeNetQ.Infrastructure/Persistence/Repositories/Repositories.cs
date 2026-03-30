using Microsoft.EntityFrameworkCore;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Infrastructure.Persistence.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(ApplicationDbContext context) : base(context) { }

    public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default)
        => await _dbSet.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).FirstOrDefaultAsync(u => u.Email == email, ct);

    public async Task<bool> EmailExistsAsync(string email, CancellationToken ct = default)
        => await _dbSet.AnyAsync(u => u.Email == email, ct);
}

public class ContributionRepository : BaseRepository<Contribution>, IContributionRepository
{
    public ContributionRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IReadOnlyList<Contribution>> GetByUserIdAsync(Guid userId, int page, int pageSize, CancellationToken ct = default)
        => await _dbSet
            .Include(c => c.Tier)
            .Where(c => c.UserId == userId)
            .OrderByDescending(c => c.BillingDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);
}

public class AssistanceRequestRepository : BaseRepository<AssistanceRequest>, IAssistanceRequestRepository
{
    public AssistanceRequestRepository(ApplicationDbContext context) : base(context) { }

    public async Task<AssistanceRequest?> GetWithDetailsAsync(Guid id, CancellationToken ct = default)
        => await _dbSet
            .Include(r => r.Votes).ThenInclude(v => v.CommitteeMember)
            .Include(r => r.Appeals)
            .Include(r => r.Documents)
            .FirstOrDefaultAsync(r => r.Id == id, ct);

    public async Task<IReadOnlyList<AssistanceRequest>> GetPendingReviewsAsync(CancellationToken ct = default)
        => await _dbSet.Where(r => r.Status == RequestStatus.Submitted || r.Status == RequestStatus.UnderReview).ToListAsync(ct);
}

public class FundAccountRepository : BaseRepository<FundAccount>, IFundAccountRepository
{
    public FundAccountRepository(ApplicationDbContext context) : base(context) { }

    public async Task<FundAccount?> GetByTypeAsync(FundAccountType type, CancellationToken ct = default)
        => await _dbSet.FirstOrDefaultAsync(f => f.Type == type, ct);
}

public class KycVerificationRepository : BaseRepository<KycVerification>, IKycVerificationRepository
{
    public KycVerificationRepository(ApplicationDbContext context) : base(context) { }

    public async Task<KycVerification?> GetByUserIdAsync(Guid userId, CancellationToken ct = default)
        => await _dbSet.FirstOrDefaultAsync(k => k.UserId == userId, ct);
}

public class PaymentMethodRepository : BaseRepository<PaymentMethod>, IPaymentMethodRepository
{
    public PaymentMethodRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IReadOnlyList<PaymentMethod>> GetByUserIdAsync(Guid userId, CancellationToken ct = default)
        => await _dbSet.Where(p => p.UserId == userId).ToListAsync(ct);

    public async Task<PaymentMethod?> GetDefaultByUserIdAsync(Guid userId, CancellationToken ct = default)
        => await _dbSet.FirstOrDefaultAsync(p => p.UserId == userId && p.IsDefault, ct);
}

public class CommitteeVoteRepository : BaseRepository<CommitteeVote>, ICommitteeVoteRepository
{
    public CommitteeVoteRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IReadOnlyList<CommitteeVote>> GetByRequestIdAsync(Guid requestId, CancellationToken ct = default)
        => await _dbSet.Where(v => v.RequestId == requestId).ToListAsync(ct);
}

public class AppealRepository : BaseRepository<Appeal>, IAppealRepository
{
    public AppealRepository(ApplicationDbContext context) : base(context) { }
}

public class PayoutRepository : BaseRepository<Payout>, IPayoutRepository
{
    public PayoutRepository(ApplicationDbContext context) : base(context) { }
}

public class FundTransactionRepository : BaseRepository<FundTransaction>, IFundTransactionRepository
{
    public FundTransactionRepository(ApplicationDbContext context) : base(context) { }
}

public class DocumentRepository : BaseRepository<Document>, IDocumentRepository
{
    public DocumentRepository(ApplicationDbContext context) : base(context) { }
}

public class FeedEntryRepository : BaseRepository<FeedEntry>, IFeedEntryRepository
{
    public FeedEntryRepository(ApplicationDbContext context) : base(context) { }
}

public class NotificationRepository : BaseRepository<Notification>, INotificationRepository
{
    public NotificationRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IReadOnlyList<Notification>> GetByUserIdAsync(Guid userId, CancellationToken ct = default)
        => await _dbSet.Where(n => n.UserId == userId).OrderByDescending(n => n.CreatedAt).ToListAsync(ct);
}

public class AuditEntryRepository : BaseRepository<AuditEntry>, IAuditEntryRepository
{
    public AuditEntryRepository(ApplicationDbContext context) : base(context) { }
}

public class ContributionTierRepository : BaseRepository<ContributionTier>, IContributionTierRepository
{
    public ContributionTierRepository(ApplicationDbContext context) : base(context) { }
}

public class RoleRepository : BaseRepository<Role>, IRoleRepository
{
    public RoleRepository(ApplicationDbContext context) : base(context) { }
}
