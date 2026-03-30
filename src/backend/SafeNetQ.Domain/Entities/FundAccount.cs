using SafeNetQ.Domain.Common;
using SafeNetQ.Domain.Enums;

namespace SafeNetQ.Domain.Entities;

public class FundAccount : BaseEntity
{
    public FundAccountType Type { get; set; }
    public decimal Balance { get; set; }
    public DateTime? LastReconciled { get; set; }

    public ICollection<FundTransaction> Transactions { get; set; } = new List<FundTransaction>();
}
