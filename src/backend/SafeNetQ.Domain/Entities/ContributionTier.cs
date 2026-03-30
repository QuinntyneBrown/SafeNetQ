using SafeNetQ.Domain.Common;

namespace SafeNetQ.Domain.Entities;

public class ContributionTier : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public decimal MonthlyAmount { get; set; }
    public decimal MaxPayoutPerEvent { get; set; }
    public int MaxPayoutsPerYear { get; set; }

    public ICollection<Contribution> Contributions { get; set; } = new List<Contribution>();
}
