using FluentValidation;
using SafeNetQ.Application.Commands.Auth;
using SafeNetQ.Application.Commands.AssistanceRequests;
using SafeNetQ.Application.Commands.Contributions;
using SafeNetQ.Application.Commands.Kyc;

namespace SafeNetQ.Application.Behaviors;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(256);
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Phone).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Password).NotEmpty().MinimumLength(8).MaximumLength(128);
    }
}

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
    }
}

public class SubmitKycCommandValidator : AbstractValidator<SubmitKycCommand>
{
    public SubmitKycCommandValidator()
    {
        RuleFor(x => x.DocumentUrl).NotEmpty();
        RuleFor(x => x.SelfieUrl).NotEmpty();
        RuleFor(x => x.IdType).IsInEnum();
    }
}

public class SetupPaymentMethodCommandValidator : AbstractValidator<SetupPaymentMethodCommand>
{
    public SetupPaymentMethodCommandValidator()
    {
        RuleFor(x => x.StripePaymentMethodId).NotEmpty();
        RuleFor(x => x.Type).IsInEnum();
    }
}

public class ChangeTierCommandValidator : AbstractValidator<ChangeTierCommand>
{
    public ChangeTierCommandValidator()
    {
        RuleFor(x => x.NewTierId).NotEmpty();
    }
}

public class SubmitAssistanceRequestCommandValidator : AbstractValidator<SubmitAssistanceRequestCommand>
{
    public SubmitAssistanceRequestCommandValidator()
    {
        RuleFor(x => x.Category).IsInEnum();
        RuleFor(x => x.Description).NotEmpty().MaximumLength(2000);
        RuleFor(x => x.RequestedAmount).GreaterThan(0).LessThanOrEqualTo(50000);
    }
}

public class CastVoteCommandValidator : AbstractValidator<CastVoteCommand>
{
    public CastVoteCommandValidator()
    {
        RuleFor(x => x.RequestId).NotEmpty();
        RuleFor(x => x.Vote).IsInEnum();
        RuleFor(x => x.Justification).NotEmpty().MaximumLength(1000);
    }
}

public class SubmitAppealCommandValidator : AbstractValidator<SubmitAppealCommand>
{
    public SubmitAppealCommandValidator()
    {
        RuleFor(x => x.RequestId).NotEmpty();
        RuleFor(x => x.Reason).NotEmpty().MaximumLength(2000);
    }
}
