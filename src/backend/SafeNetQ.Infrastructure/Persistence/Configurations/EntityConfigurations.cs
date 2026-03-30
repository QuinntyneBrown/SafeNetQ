using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SafeNetQ.Domain.Entities;

namespace SafeNetQ.Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        builder.HasIndex(u => u.Email).IsUnique();
        builder.Property(u => u.Email).HasMaxLength(256).IsRequired();
        builder.Property(u => u.FirstName).HasMaxLength(100).IsRequired();
        builder.Property(u => u.LastName).HasMaxLength(100).IsRequired();
        builder.Property(u => u.Phone).HasMaxLength(20);
        builder.Property(u => u.PasswordHash).HasMaxLength(512).IsRequired();
        builder.Property(u => u.Status).HasConversion<string>().HasMaxLength(20);
        builder.Property(u => u.KycStatus).HasConversion<string>().HasMaxLength(20);
        builder.Ignore(u => u.DomainEvents);
    }
}

public class KycVerificationConfiguration : IEntityTypeConfiguration<KycVerification>
{
    public void Configure(EntityTypeBuilder<KycVerification> builder)
    {
        builder.HasKey(k => k.Id);
        builder.HasOne(k => k.User).WithOne(u => u.KycVerification).HasForeignKey<KycVerification>(k => k.UserId);
        builder.Property(k => k.IdType).HasConversion<string>().HasMaxLength(30);
        builder.Property(k => k.Status).HasConversion<string>().HasMaxLength(20);
        builder.Property(k => k.DocumentUrl).HasMaxLength(500);
        builder.Property(k => k.SelfieUrl).HasMaxLength(500);
        builder.Property(k => k.ConfidenceScore).HasPrecision(5, 4);
        builder.Ignore(k => k.DomainEvents);
    }
}

public class ContributionTierConfiguration : IEntityTypeConfiguration<ContributionTier>
{
    public void Configure(EntityTypeBuilder<ContributionTier> builder)
    {
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name).HasMaxLength(50).IsRequired();
        builder.Property(t => t.MonthlyAmount).HasPrecision(10, 2);
        builder.Property(t => t.MaxPayoutPerEvent).HasPrecision(12, 2);
        builder.Ignore(t => t.DomainEvents);
    }
}

public class ContributionConfiguration : IEntityTypeConfiguration<Contribution>
{
    public void Configure(EntityTypeBuilder<Contribution> builder)
    {
        builder.HasKey(c => c.Id);
        builder.HasOne(c => c.User).WithMany(u => u.Contributions).HasForeignKey(c => c.UserId);
        builder.HasOne(c => c.Tier).WithMany(t => t.Contributions).HasForeignKey(c => c.TierId);
        builder.HasOne(c => c.PaymentMethod).WithMany().HasForeignKey(c => c.PaymentMethodId);
        builder.Property(c => c.Amount).HasPrecision(10, 2);
        builder.Property(c => c.TrustPortion).HasPrecision(10, 2);
        builder.Property(c => c.ReservePortion).HasPrecision(10, 2);
        builder.Property(c => c.PlatformFeePortion).HasPrecision(10, 2);
        builder.Property(c => c.Status).HasConversion<string>().HasMaxLength(20);
        builder.Ignore(c => c.DomainEvents);
    }
}

public class PaymentMethodConfiguration : IEntityTypeConfiguration<PaymentMethod>
{
    public void Configure(EntityTypeBuilder<PaymentMethod> builder)
    {
        builder.HasKey(p => p.Id);
        builder.HasOne(p => p.User).WithMany(u => u.PaymentMethods).HasForeignKey(p => p.UserId);
        builder.Property(p => p.Type).HasConversion<string>().HasMaxLength(20);
        builder.Property(p => p.Last4).HasMaxLength(4);
        builder.Property(p => p.StripePaymentMethodId).HasMaxLength(256);
        builder.Ignore(p => p.DomainEvents);
    }
}

public class AssistanceRequestConfiguration : IEntityTypeConfiguration<AssistanceRequest>
{
    public void Configure(EntityTypeBuilder<AssistanceRequest> builder)
    {
        builder.HasKey(a => a.Id);
        builder.HasOne(a => a.User).WithMany(u => u.AssistanceRequests).HasForeignKey(a => a.UserId);
        builder.Property(a => a.Category).HasConversion<string>().HasMaxLength(30);
        builder.Property(a => a.Description).HasMaxLength(2000);
        builder.Property(a => a.RequestedAmount).HasPrecision(12, 2);
        builder.Property(a => a.Status).HasConversion<string>().HasMaxLength(20);
        builder.Ignore(a => a.DomainEvents);
    }
}

public class CommitteeVoteConfiguration : IEntityTypeConfiguration<CommitteeVote>
{
    public void Configure(EntityTypeBuilder<CommitteeVote> builder)
    {
        builder.HasKey(v => v.Id);
        builder.HasOne(v => v.Request).WithMany(r => r.Votes).HasForeignKey(v => v.RequestId);
        builder.HasOne(v => v.CommitteeMember).WithMany().HasForeignKey(v => v.CommitteeMemberId).OnDelete(DeleteBehavior.NoAction);
        builder.Property(v => v.Vote).HasConversion<string>().HasMaxLength(20);
        builder.Property(v => v.Justification).HasMaxLength(1000);
        builder.Ignore(v => v.DomainEvents);
    }
}

public class AppealConfiguration : IEntityTypeConfiguration<Appeal>
{
    public void Configure(EntityTypeBuilder<Appeal> builder)
    {
        builder.HasKey(a => a.Id);
        builder.HasOne(a => a.Request).WithMany(r => r.Appeals).HasForeignKey(a => a.RequestId);
        builder.Property(a => a.Reason).HasMaxLength(2000);
        builder.Property(a => a.Status).HasConversion<string>().HasMaxLength(20);
        builder.Ignore(a => a.DomainEvents);
    }
}

public class PayoutConfiguration : IEntityTypeConfiguration<Payout>
{
    public void Configure(EntityTypeBuilder<Payout> builder)
    {
        builder.HasKey(p => p.Id);
        builder.HasOne(p => p.Request).WithOne(r => r.Payout).HasForeignKey<Payout>(p => p.RequestId);
        builder.HasOne(p => p.User).WithMany().HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.NoAction);
        builder.Property(p => p.Amount).HasPrecision(12, 2);
        builder.Property(p => p.Method).HasConversion<string>().HasMaxLength(20);
        builder.Property(p => p.Status).HasConversion<string>().HasMaxLength(20);
        builder.Property(p => p.Reference).HasMaxLength(256);
        builder.Ignore(p => p.DomainEvents);
    }
}

public class FundAccountConfiguration : IEntityTypeConfiguration<FundAccount>
{
    public void Configure(EntityTypeBuilder<FundAccount> builder)
    {
        builder.HasKey(f => f.Id);
        builder.Property(f => f.Type).HasConversion<string>().HasMaxLength(20);
        builder.Property(f => f.Balance).HasPrecision(18, 2);
        builder.Ignore(f => f.DomainEvents);
    }
}

public class FundTransactionConfiguration : IEntityTypeConfiguration<FundTransaction>
{
    public void Configure(EntityTypeBuilder<FundTransaction> builder)
    {
        builder.HasKey(t => t.Id);
        builder.HasOne(t => t.Account).WithMany(a => a.Transactions).HasForeignKey(t => t.AccountId);
        builder.Property(t => t.Amount).HasPrecision(18, 2);
        builder.Property(t => t.Type).HasConversion<string>().HasMaxLength(30);
        builder.Property(t => t.Description).HasMaxLength(500);
        builder.Ignore(t => t.DomainEvents);
    }
}

public class DocumentConfiguration : IEntityTypeConfiguration<Document>
{
    public void Configure(EntityTypeBuilder<Document> builder)
    {
        builder.HasKey(d => d.Id);
        builder.HasOne(d => d.User).WithMany(u => u.Documents).HasForeignKey(d => d.UserId);
        builder.HasOne(d => d.Request).WithMany(r => r.Documents).HasForeignKey(d => d.RequestId);
        builder.Property(d => d.FileName).HasMaxLength(256);
        builder.Property(d => d.ContentType).HasMaxLength(100);
        builder.Property(d => d.StorageUrl).HasMaxLength(500);
        builder.Property(d => d.EncryptionKeyId).HasMaxLength(256);
        builder.Ignore(d => d.DomainEvents);
    }
}

public class FeedEntryConfiguration : IEntityTypeConfiguration<FeedEntry>
{
    public void Configure(EntityTypeBuilder<FeedEntry> builder)
    {
        builder.HasKey(f => f.Id);
        builder.Property(f => f.Category).HasConversion<string>().HasMaxLength(30);
        builder.Property(f => f.AmountRange).HasMaxLength(50);
        builder.Property(f => f.Message).HasMaxLength(500);
        builder.Ignore(f => f.DomainEvents);
    }
}

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
        builder.HasKey(n => n.Id);
        builder.HasOne(n => n.User).WithMany(u => u.Notifications).HasForeignKey(n => n.UserId);
        builder.Property(n => n.Type).HasConversion<string>().HasMaxLength(20);
        builder.Property(n => n.Title).HasMaxLength(200);
        builder.Property(n => n.Body).HasMaxLength(2000);
        builder.Property(n => n.Channel).HasConversion<string>().HasMaxLength(20);
        builder.Property(n => n.Status).HasMaxLength(20);
        builder.Ignore(n => n.DomainEvents);
    }
}

public class AuditEntryConfiguration : IEntityTypeConfiguration<AuditEntry>
{
    public void Configure(EntityTypeBuilder<AuditEntry> builder)
    {
        builder.HasKey(a => a.Id);
        builder.HasOne(a => a.User).WithMany(u => u.AuditEntries).HasForeignKey(a => a.UserId);
        builder.Property(a => a.Action).HasMaxLength(100);
        builder.Property(a => a.EntityType).HasMaxLength(100);
        builder.Property(a => a.Details).HasMaxLength(4000);
        builder.Property(a => a.IpAddress).HasMaxLength(45);
        builder.Ignore(a => a.DomainEvents);
    }
}

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasKey(r => r.Id);
        builder.HasIndex(r => r.Name).IsUnique();
        builder.Property(r => r.Name).HasMaxLength(50).IsRequired();
        builder.Property(r => r.Description).HasMaxLength(200);
        builder.Ignore(r => r.DomainEvents);
    }
}

public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
{
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder.HasKey(p => p.Id);
        builder.HasIndex(p => p.Name).IsUnique();
        builder.Property(p => p.Name).HasMaxLength(100).IsRequired();
        builder.Property(p => p.Description).HasMaxLength(200);
        builder.Ignore(p => p.DomainEvents);
    }
}

public class RolePermissionConfiguration : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        builder.HasKey(rp => new { rp.RoleId, rp.PermissionId });
        builder.HasOne(rp => rp.Role).WithMany(r => r.RolePermissions).HasForeignKey(rp => rp.RoleId);
        builder.HasOne(rp => rp.Permission).WithMany(p => p.RolePermissions).HasForeignKey(rp => rp.PermissionId);
    }
}

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
    public void Configure(EntityTypeBuilder<UserRole> builder)
    {
        builder.HasKey(ur => new { ur.UserId, ur.RoleId });
        builder.HasOne(ur => ur.User).WithMany(u => u.UserRoles).HasForeignKey(ur => ur.UserId);
        builder.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId);
    }
}
