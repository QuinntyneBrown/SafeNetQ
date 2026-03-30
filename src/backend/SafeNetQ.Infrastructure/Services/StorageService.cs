using Microsoft.Extensions.Logging;
using SafeNetQ.Application.Interfaces;

namespace SafeNetQ.Infrastructure.Services;

public class StorageService : IStorageService
{
    private readonly ILogger<StorageService> _logger;

    public StorageService(ILogger<StorageService> logger) => _logger = logger;

    public Task<string> UploadAsync(Stream stream, string fileName, string contentType, CancellationToken ct = default)
    {
        // Placeholder: integrate with S3/Azure Blob in production
        _logger.LogInformation("Uploading {FileName} ({ContentType})", fileName, contentType);
        return Task.FromResult($"https://storage.safenetq.com/{Guid.NewGuid()}/{fileName}");
    }

    public Task<Stream> DownloadAsync(string url, CancellationToken ct = default)
    {
        _logger.LogInformation("Downloading {Url}", url);
        return Task.FromResult<Stream>(new MemoryStream());
    }

    public Task<string> GetPresignedUrlAsync(string url, TimeSpan expiry, CancellationToken ct = default)
    {
        return Task.FromResult($"{url}?token={Guid.NewGuid()}&expires={DateTime.UtcNow.Add(expiry):O}");
    }
}
