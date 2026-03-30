namespace SafeNetQ.Application.DTOs;

public record SubmitStrDto(Guid UserId, string Reason, string Details);
public record ComplianceReportDto(Guid Id, string Type, string Status, DateTime CreatedAt, string? Details);
