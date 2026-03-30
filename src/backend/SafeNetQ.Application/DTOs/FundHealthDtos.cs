namespace SafeNetQ.Application.DTOs;

public record FundHealthDto(decimal TrustBalance, decimal ReserveBalance, decimal OperatingBalance, decimal TotalMembers, decimal MonthlyInflow, decimal MonthlyOutflow, decimal RunwayMonths);
public record FundBalanceDto(Guid Id, string Type, decimal Balance, DateTime? LastReconciled);
