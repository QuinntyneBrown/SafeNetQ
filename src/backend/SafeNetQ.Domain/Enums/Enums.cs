namespace SafeNetQ.Domain.Enums;

public enum UserStatus { Pending, Active, Suspended, Deactivated }
public enum KycStatus { NotStarted, Pending, Verified, Rejected }
public enum ContributionStatus { Active, PastDue, Cancelled, Paused }
public enum EmergencyCategory { Medical, Housing, CarRepair, FuneralExpense, NaturalDisaster, JobLoss, Other }
public enum RequestStatus { Draft, Submitted, UnderReview, Approved, Denied, Appealed, Paid, Closed }
public enum PayoutStatus { Pending, Processing, Completed, Failed, Reversed }
public enum PayoutMethod { BankTransfer, Check, Zelle, Venmo }
public enum FundAccountType { Trust, Reserve, Operating }
public enum NotificationType { Email, Sms, Push, InApp }
public enum VoteDecision { Approve, Deny, Abstain, RequestInfo }
public enum NotificationChannel { Email, Sms, Push, InApp }
public enum FundTransactionType { ContributionInflow, PayoutOutflow, FeeCollection, Transfer, Adjustment }
public enum PaymentMethodType { Card, BankAccount }
public enum IdDocumentType { DriversLicense, Passport, StateId, MilitaryId }
public enum AppealStatus { Submitted, UnderReview, Upheld, Overturned }
