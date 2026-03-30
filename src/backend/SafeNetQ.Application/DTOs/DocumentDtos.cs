namespace SafeNetQ.Application.DTOs;

public record UploadDocumentDto(Guid? RequestId, string FileName, string ContentType, long SizeBytes);
public record DocumentDto(Guid Id, string FileName, string ContentType, long SizeBytes, DateTime CreatedAt, DateTime? ExpiresAt);
public record DocumentUrlDto(string Url, DateTime ExpiresAt);
