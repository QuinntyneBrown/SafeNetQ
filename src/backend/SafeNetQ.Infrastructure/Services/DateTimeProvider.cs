using SafeNetQ.Application.Interfaces;

namespace SafeNetQ.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
