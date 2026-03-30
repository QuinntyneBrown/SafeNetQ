using AutoMapper;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Domain.Entities;

namespace SafeNetQ.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, ProfileDto>();
        CreateMap<User, MemberDto>()
            .ForMember(d => d.FullName, opt => opt.MapFrom(s => $"{s.FirstName} {s.LastName}"));
        CreateMap<Contribution, ContributionDto>()
            .ForMember(d => d.TierName, opt => opt.MapFrom(s => s.Tier != null ? s.Tier.Name : string.Empty));
        CreateMap<ContributionTier, ContributionTierDto>();
        CreateMap<KycVerification, KycStatusDto>();
        CreateMap<PaymentMethod, PaymentMethodDto>();
        CreateMap<AssistanceRequest, AssistanceRequestDto>();
        CreateMap<CommitteeVote, VoteDto>()
            .ForMember(d => d.CommitteeMemberName, opt => opt.MapFrom(s => s.CommitteeMember != null ? $"{s.CommitteeMember.FirstName} {s.CommitteeMember.LastName}" : string.Empty));
        CreateMap<Appeal, AppealDto>();
        CreateMap<Payout, PayoutDto>();
        CreateMap<Document, DocumentDto>();
        CreateMap<FeedEntry, FeedEntryDto>();
        CreateMap<Notification, NotificationDto>();
        CreateMap<AuditEntry, AuditEntryDto>();
        CreateMap<FundAccount, FundBalanceDto>()
            .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type.ToString()));
    }
}
