using System.Linq.Expressions;
using SafeNetQ.Domain.Common;

namespace SafeNetQ.Domain.Interfaces;

public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IReadOnlyList<T>> GetAllAsync(CancellationToken ct = default);
    Task<IReadOnlyList<T>> FindAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default);
    Task<T> AddAsync(T entity, CancellationToken ct = default);
    Task UpdateAsync(T entity, CancellationToken ct = default);
    Task DeleteAsync(T entity, CancellationToken ct = default);
    Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null, CancellationToken ct = default);
}

public interface IUserRepository : IRepository<Entities.User>
{
    Task<Entities.User?> GetByEmailAsync(string email, CancellationToken ct = default);
    Task<bool> EmailExistsAsync(string email, CancellationToken ct = default);
}

public interface IContributionRepository : IRepository<Entities.Contribution>
{
    Task<IReadOnlyList<Entities.Contribution>> GetByUserIdAsync(Guid userId, int page, int pageSize, CancellationToken ct = default);
}

public interface IAssistanceRequestRepository : IRepository<Entities.AssistanceRequest>
{
    Task<Entities.AssistanceRequest?> GetWithDetailsAsync(Guid id, CancellationToken ct = default);
    Task<IReadOnlyList<Entities.AssistanceRequest>> GetPendingReviewsAsync(CancellationToken ct = default);
}

public interface IFundAccountRepository : IRepository<Entities.FundAccount>
{
    Task<Entities.FundAccount?> GetByTypeAsync(Enums.FundAccountType type, CancellationToken ct = default);
}

public interface IKycVerificationRepository : IRepository<Entities.KycVerification>
{
    Task<Entities.KycVerification?> GetByUserIdAsync(Guid userId, CancellationToken ct = default);
}

public interface IPaymentMethodRepository : IRepository<Entities.PaymentMethod>
{
    Task<IReadOnlyList<Entities.PaymentMethod>> GetByUserIdAsync(Guid userId, CancellationToken ct = default);
    Task<Entities.PaymentMethod?> GetDefaultByUserIdAsync(Guid userId, CancellationToken ct = default);
}

public interface ICommitteeVoteRepository : IRepository<Entities.CommitteeVote>
{
    Task<IReadOnlyList<Entities.CommitteeVote>> GetByRequestIdAsync(Guid requestId, CancellationToken ct = default);
}

public interface IAppealRepository : IRepository<Entities.Appeal> { }
public interface IPayoutRepository : IRepository<Entities.Payout> { }
public interface IFundTransactionRepository : IRepository<Entities.FundTransaction> { }
public interface IDocumentRepository : IRepository<Entities.Document> { }
public interface IFeedEntryRepository : IRepository<Entities.FeedEntry> { }
public interface INotificationRepository : IRepository<Entities.Notification>
{
    Task<IReadOnlyList<Entities.Notification>> GetByUserIdAsync(Guid userId, CancellationToken ct = default);
}
public interface IAuditEntryRepository : IRepository<Entities.AuditEntry> { }
public interface IContributionTierRepository : IRepository<Entities.ContributionTier> { }
public interface IRoleRepository : IRepository<Entities.Role> { }

public interface IUnitOfWork : IDisposable
{
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
