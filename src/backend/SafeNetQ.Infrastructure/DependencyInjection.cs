using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Interfaces;
using SafeNetQ.Infrastructure.Jobs;
using SafeNetQ.Infrastructure.Persistence;
using SafeNetQ.Infrastructure.Persistence.Repositories;
using SafeNetQ.Infrastructure.Services;

namespace SafeNetQ.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Database
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection") ?? "Host=localhost;Database=safenetq;Username=postgres;Password=postgres"));

        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IContributionRepository, ContributionRepository>();
        services.AddScoped<IAssistanceRequestRepository, AssistanceRequestRepository>();
        services.AddScoped<IFundAccountRepository, FundAccountRepository>();
        services.AddScoped<IKycVerificationRepository, KycVerificationRepository>();
        services.AddScoped<IPaymentMethodRepository, PaymentMethodRepository>();
        services.AddScoped<ICommitteeVoteRepository, CommitteeVoteRepository>();
        services.AddScoped<IAppealRepository, AppealRepository>();
        services.AddScoped<IPayoutRepository, PayoutRepository>();
        services.AddScoped<IFundTransactionRepository, FundTransactionRepository>();
        services.AddScoped<IDocumentRepository, DocumentRepository>();
        services.AddScoped<IFeedEntryRepository, FeedEntryRepository>();
        services.AddScoped<INotificationRepository, NotificationRepository>();
        services.AddScoped<IAuditEntryRepository, AuditEntryRepository>();
        services.AddScoped<IContributionTierRepository, ContributionTierRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        // Services
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IEncryptionService, AesEncryptionService>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IStorageService, StorageService>();
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

        // Background Jobs
        services.AddHostedService<MonthlyBillingJob>();
        services.AddHostedService<DocumentRetentionJob>();

        return services;
    }
}
