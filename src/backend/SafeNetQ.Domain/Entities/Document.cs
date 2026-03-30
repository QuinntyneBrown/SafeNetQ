using SafeNetQ.Domain.Common;

namespace SafeNetQ.Domain.Entities;

public class Document : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid? RequestId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long SizeBytes { get; set; }
    public string StorageUrl { get; set; } = string.Empty;
    public string? EncryptionKeyId { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
    public AssistanceRequest? Request { get; set; }
}
