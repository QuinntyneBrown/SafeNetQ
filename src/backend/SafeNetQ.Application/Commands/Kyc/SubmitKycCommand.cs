using MediatR;
using SafeNetQ.Application.DTOs;
using SafeNetQ.Application.Interfaces;
using SafeNetQ.Domain.Entities;
using SafeNetQ.Domain.Enums;
using SafeNetQ.Domain.Interfaces;

namespace SafeNetQ.Application.Commands.Kyc;

public record SubmitKycCommand(IdDocumentType IdType, string DocumentUrl, string SelfieUrl) : IRequest<KycStatusDto>;

public class SubmitKycCommandHandler : IRequestHandler<SubmitKycCommand, KycStatusDto>
{
    private readonly IKycVerificationRepository _kycRepo;
    private readonly IUserRepository _userRepo;
    private readonly ICurrentUserService _currentUser;
    private readonly IUnitOfWork _uow;

    public SubmitKycCommandHandler(IKycVerificationRepository kycRepo, IUserRepository userRepo, ICurrentUserService currentUser, IUnitOfWork uow)
    {
        _kycRepo = kycRepo;
        _userRepo = userRepo;
        _currentUser = currentUser;
        _uow = uow;
    }

    public async Task<KycStatusDto> Handle(SubmitKycCommand request, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? throw new UnauthorizedAccessException();
        var user = await _userRepo.GetByIdAsync(userId, ct) ?? throw new InvalidOperationException("User not found");

        var kyc = new KycVerification
        {
            UserId = userId,
            IdType = request.IdType,
            DocumentUrl = request.DocumentUrl,
            SelfieUrl = request.SelfieUrl,
            Status = KycStatus.Pending
        };

        await _kycRepo.AddAsync(kyc, ct);
        user.KycStatus = KycStatus.Pending;
        user.UpdatedAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user, ct);
        await _uow.SaveChangesAsync(ct);

        return new KycStatusDto(kyc.Id, kyc.Status, kyc.ConfidenceScore, kyc.VerifiedAt);
    }
}
