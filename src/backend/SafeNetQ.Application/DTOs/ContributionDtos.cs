using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Application.DTOs;

public record ContributionDto(Guid Id, decimal Amount, decimal TrustPortion, decimal ReservePortion, decimal PlatformFeePortion, ContributionStatus Status, DateTime BillingDate, string TierName);
public record ContributionHistoryDto(IReadOnlyList<ContributionDto> Items, int TotalCount, int Page, int PageSize);
public record SetupPaymentMethodDto(PaymentMethodType Type, string StripePaymentMethodId);
public record ChangeTierDto(Guid NewTierId);
public record PaymentMethodDto(Guid Id, PaymentMethodType Type, string Last4, int? ExpiryMonth, int? ExpiryYear, bool IsDefault);
public record ContributionTierDto(Guid Id, string Name, decimal MonthlyAmount, decimal MaxPayoutPerEvent, int MaxPayoutsPerYear);
