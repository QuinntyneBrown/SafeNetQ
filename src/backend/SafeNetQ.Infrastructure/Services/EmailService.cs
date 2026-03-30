using Microsoft.Extensions.Logging;
using SafeNetQ.Application.Interfaces;

namespace SafeNetQ.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;

    public EmailService(ILogger<EmailService> logger) => _logger = logger;

    public Task SendAsync(string to, string subject, string body, CancellationToken ct = default)
    {
        // Placeholder: integrate with SendGrid/SES in production
        _logger.LogInformation("Sending email to {To}: {Subject}", to, subject);
        return Task.CompletedTask;
    }
}
