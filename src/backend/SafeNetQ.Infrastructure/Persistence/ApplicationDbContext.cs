using Microsoft.EntityFrameworkCore;
using SafeNetQ.Domain.Entities;

namespace SafeNetQ.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<KycVerification> KycVerifications => Set<KycVerification>();
    public DbSet<ContributionTier> ContributionTiers => Set<ContributionTier>();
    public DbSet<Contribution> Contributions => Set<Contribution>();
    public DbSet<PaymentMethod> PaymentMethods => Set<PaymentMethod>();
    public DbSet<AssistanceRequest> AssistanceRequests => Set<AssistanceRequest>();
    public DbSet<CommitteeVote> CommitteeVotes => Set<CommitteeVote>();
    public DbSet<Appeal> Appeals => Set<Appeal>();
    public DbSet<Payout> Payouts => Set<Payout>();
    public DbSet<FundAccount> FundAccounts => Set<FundAccount>();
    public DbSet<FundTransaction> FundTransactions => Set<FundTransaction>();
    public DbSet<Document> Documents => Set<Document>();
    public DbSet<FeedEntry> FeedEntries => Set<FeedEntry>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<AuditEntry> AuditEntries => Set<AuditEntry>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
