namespace SafeNetQ.Shared;

public static class AppConstants
{
    public const string TrustFundSplitPercentage = "70";
    public const string ReserveFundSplitPercentage = "20";
    public const string PlatformFeeSplitPercentage = "10";
    public const int MinimumVotesRequired = 3;
    public const int MaxAppealsPerRequest = 1;
    public const int DocumentRetentionDays = 90;
}

public static class RoleNames
{
    public const string Admin = "Admin";
    public const string Member = "Member";
    public const string CommitteeMember = "CommitteeMember";
    public const string ComplianceOfficer = "ComplianceOfficer";
}
