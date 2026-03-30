using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record SubmitKycDto(IdDocumentType IdType, string DocumentUrl, string SelfieUrl);
public record KycStatusDto(Guid Id, KycStatus Status, decimal? ConfidenceScore, DateTime? VerifiedAt);
