using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Infrastructure.Jobs;

public class DocumentRetentionJob : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<DocumentRetentionJob> _logger;

    public DocumentRetentionJob(IServiceScopeFactory scopeFactory, ILogger<DocumentRetentionJob> logger)
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
                _logger.LogInformation("Running document retention cleanup");
                using var scope = _scopeFactory.CreateScope();
                var docRepo = scope.ServiceProvider.GetRequiredService<IDocumentRepository>();
                var uow = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

                var expired = await docRepo.FindAsync(d => d.ExpiresAt != null && d.ExpiresAt <= DateTime.UtcNow, stoppingToken);

                foreach (var doc in expired)
                {
                    _logger.LogInformation("Deleting expired document {Id}", doc.Id);
                    await docRepo.DeleteAsync(doc, stoppingToken);
                }

                await uow.SaveChangesAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in document retention job");
            }

            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }
}
