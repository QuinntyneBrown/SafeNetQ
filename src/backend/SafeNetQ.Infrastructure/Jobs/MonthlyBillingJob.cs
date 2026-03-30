using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Infrastructure.Jobs;

public class MonthlyBillingJob : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<MonthlyBillingJob> _logger;

    public MonthlyBillingJob(IServiceScopeFactory scopeFactory, ILogger<MonthlyBillingJob> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                _logger.LogInformation("Running monthly billing check");
                using var scope = _scopeFactory.CreateScope();
                var contribRepo = scope.ServiceProvider.GetRequiredService<IContributionRepository>();
                var uow = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

                // Process due contributions
                var due = await contribRepo.FindAsync(c =>
                    c.Status == ContributionStatus.Active && c.BillingDate <= DateTime.UtcNow, stoppingToken);

                foreach (var contribution in due)
                {
                    _logger.LogInformation("Processing contribution {Id} for user {UserId}", contribution.Id, contribution.UserId);
                    // Placeholder for Stripe charge logic
                }

                await uow.SaveChangesAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in monthly billing job");
            }

            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }
}
