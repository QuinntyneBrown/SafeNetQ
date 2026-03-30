# SafeNetQ — Solution Folder Hierarchy

## Overview

SafeNetQ is organized as a monorepo using a modular architecture. The backend follows .NET Clean Architecture, the web frontend uses Next.js (React + TypeScript), and the mobile app uses React Native. Shared infrastructure, configuration, and documentation live alongside the application code.

---

## Root Structure

```
SafeNetQ/
├── docs/                           # Documentation
│   ├── specs/                      # L1 & L2 requirements
│   │   ├── L1.md
│   │   └── L2.md
│   ├── detailed-designs/           # Per-feature detailed designs
│   │   ├── 01-authentication-kyc/
│   │   ├── 02-contribution-management/
│   │   ├── 03-assistance-request-workflow/
│   │   ├── 04-payout-processing/
│   │   ├── 05-member-dashboard/
│   │   ├── 06-community-feed-notifications/
│   │   ├── 07-document-vault/
│   │   ├── 08-admin-governance/
│   │   ├── 09-fund-financial-governance/
│   │   ├── 10-compliance-reporting/
│   │   ├── 11-accessibility-i18n/
│   │   └── 12-integration-services/
│   ├── ui-design.pen               # Pencil UI design file
│   ├── solution-folder-hierarchy.md
│   └── hosting-costs.md
│
├── src/                            # Source code
│   ├── backend/                    # .NET 8+ Backend
│   │   └── SafeNetQ.sln
│   ├── web/                        # Next.js Web Frontend
│   └── mobile/                     # React Native Mobile App
│
├── tests/                          # Test projects
│   ├── e2e/                        # End-to-end tests (Playwright + Detox)
│   ├── integration/                # Integration tests
│   └── unit/                       # Unit tests (if separate from src)
│
├── infra/                          # Infrastructure as Code
│   ├── terraform/                  # Terraform modules
│   ├── docker/                     # Dockerfiles and compose
│   └── k8s/                        # Kubernetes manifests (if applicable)
│
├── .github/                        # GitHub configuration
│   └── workflows/                  # CI/CD pipelines
│
├── .gitignore
├── README.md
└── CLAUDE.md
```

---

## Backend Structure (.NET 8+ Clean Architecture)

```
src/backend/
├── SafeNetQ.sln                           # Solution file
│
├── SafeNetQ.Domain/                       # Domain Layer (innermost)
│   ├── Entities/
│   │   ├── User.cs
│   │   ├── KycVerification.cs
│   │   ├── Contribution.cs
│   │   ├── ContributionTier.cs
│   │   ├── PaymentMethod.cs
│   │   ├── AssistanceRequest.cs
│   │   ├── CommitteeVote.cs
│   │   ├── Appeal.cs
│   │   ├── Payout.cs
│   │   ├── FundAccount.cs
│   │   ├── FundTransaction.cs
│   │   ├── Document.cs
│   │   ├── FeedEntry.cs
│   │   ├── Notification.cs
│   │   ├── AuditEntry.cs
│   │   ├── Role.cs
│   │   └── Permission.cs
│   ├── Enums/
│   │   ├── UserStatus.cs
│   │   ├── KycStatus.cs
│   │   ├── ContributionStatus.cs
│   │   ├── RequestStatus.cs
│   │   ├── PayoutStatus.cs
│   │   ├── EmergencyCategory.cs
│   │   ├── FundAccountType.cs
│   │   └── NotificationType.cs
│   ├── ValueObjects/
│   │   ├── Money.cs
│   │   ├── Address.cs
│   │   ├── PhoneNumber.cs
│   │   └── EmailAddress.cs
│   ├── Events/
│   │   ├── ContributionProcessedEvent.cs
│   │   ├── RequestSubmittedEvent.cs
│   │   ├── PayoutApprovedEvent.cs
│   │   └── MemberSuspendedEvent.cs
│   ├── Exceptions/
│   │   ├── DomainException.cs
│   │   ├── InsufficientFundsException.cs
│   │   └── PayoutLimitExceededException.cs
│   └── Interfaces/
│       ├── IUserRepository.cs
│       ├── IContributionRepository.cs
│       ├── IAssistanceRequestRepository.cs
│       ├── IPayoutRepository.cs
│       ├── IFundAccountRepository.cs
│       ├── IDocumentRepository.cs
│       └── IAuditRepository.cs
│
├── SafeNetQ.Application/                  # Application Layer
│   ├── Common/
│   │   ├── Interfaces/
│   │   │   ├── IUnitOfWork.cs
│   │   │   ├── ICurrentUserService.cs
│   │   │   ├── IDateTimeService.cs
│   │   │   └── IEmailService.cs
│   │   ├── Behaviours/
│   │   │   ├── ValidationBehaviour.cs
│   │   │   ├── LoggingBehaviour.cs
│   │   │   └── AuditBehaviour.cs
│   │   ├── Mappings/
│   │   │   └── MappingProfile.cs
│   │   └── Models/
│   │       ├── PaginatedList.cs
│   │       └── Result.cs
│   ├── Authentication/
│   │   ├── Commands/
│   │   │   ├── Register/
│   │   │   │   ├── RegisterCommand.cs
│   │   │   │   ├── RegisterCommandHandler.cs
│   │   │   │   └── RegisterCommandValidator.cs
│   │   │   ├── Login/
│   │   │   ├── RefreshToken/
│   │   │   ├── ResetPassword/
│   │   │   └── EnableMfa/
│   │   ├── Queries/
│   │   │   └── GetCurrentUser/
│   │   └── DTOs/
│   │       ├── AuthTokenDto.cs
│   │       ├── RegisterRequestDto.cs
│   │       └── LoginRequestDto.cs
│   ├── Kyc/
│   │   ├── Commands/
│   │   │   ├── SubmitKyc/
│   │   │   └── ManualReviewKyc/
│   │   └── Queries/
│   │       └── GetKycStatus/
│   ├── Contributions/
│   │   ├── Commands/
│   │   │   ├── SetupPaymentMethod/
│   │   │   ├── ChangeTier/
│   │   │   └── ProcessMonthlyBilling/
│   │   ├── Queries/
│   │   │   ├── GetContributionHistory/
│   │   │   └── GetContributionSummary/
│   │   └── DTOs/
│   ├── AssistanceRequests/
│   │   ├── Commands/
│   │   │   ├── SubmitRequest/
│   │   │   ├── ReviewRequest/
│   │   │   ├── CastVote/
│   │   │   └── SubmitAppeal/
│   │   ├── Queries/
│   │   │   ├── GetRequestDetails/
│   │   │   ├── GetPendingReviews/
│   │   │   └── GetMyRequests/
│   │   └── DTOs/
│   ├── Payouts/
│   │   ├── Commands/
│   │   │   ├── InitiatePayout/
│   │   │   └── ProcessPayout/
│   │   └── Queries/
│   │       └── GetPayoutHistory/
│   ├── FundManagement/
│   │   ├── Commands/
│   │   │   └── RecordTransaction/
│   │   └── Queries/
│   │       ├── GetFundHealth/
│   │       └── GetAccountBalances/
│   ├── Documents/
│   │   ├── Commands/
│   │   │   ├── UploadDocument/
│   │   │   └── DeleteDocument/
│   │   └── Queries/
│   │       └── GetDocumentAccessUrl/
│   ├── CommunityFeed/
│   │   └── Queries/
│   │       └── GetFeedEntries/
│   ├── Notifications/
│   │   ├── Commands/
│   │   │   ├── SendNotification/
│   │   │   └── UpdatePreferences/
│   │   └── Handlers/
│   │       ├── ContributionNotificationHandler.cs
│   │       ├── RequestNotificationHandler.cs
│   │       └── PayoutNotificationHandler.cs
│   ├── Admin/
│   │   ├── Commands/
│   │   │   ├── SuspendMember/
│   │   │   ├── ReactivateMember/
│   │   │   └── AssignRole/
│   │   └── Queries/
│   │       ├── GetMemberList/
│   │       ├── GetAuditTrail/
│   │       └── GetComplianceDashboard/
│   └── Compliance/
│       ├── Commands/
│       │   ├── FileStr/
│       │   └── GenerateReport/
│       └── Queries/
│           ├── GetSuspiciousTransactions/
│           └── GetFinancialReport/
│
├── SafeNetQ.Infrastructure/              # Infrastructure Layer
│   ├── Persistence/
│   │   ├── ApplicationDbContext.cs
│   │   ├── Configurations/               # EF Core entity configs
│   │   │   ├── UserConfiguration.cs
│   │   │   ├── ContributionConfiguration.cs
│   │   │   ├── AssistanceRequestConfiguration.cs
│   │   │   └── ...
│   │   ├── Migrations/
│   │   ├── Repositories/
│   │   │   ├── UserRepository.cs
│   │   │   ├── ContributionRepository.cs
│   │   │   └── ...
│   │   └── Interceptors/
│   │       ├── AuditInterceptor.cs
│   │       └── SoftDeleteInterceptor.cs
│   ├── Identity/
│   │   ├── IdentityService.cs
│   │   ├── JwtTokenService.cs
│   │   └── MfaService.cs
│   ├── ExternalServices/
│   │   ├── Stripe/
│   │   │   ├── StripePaymentService.cs
│   │   │   └── StripeWebhookHandler.cs
│   │   ├── Jumio/
│   │   │   ├── JumioKycService.cs
│   │   │   └── JumioWebhookHandler.cs
│   │   ├── SendGrid/
│   │   │   └── SendGridEmailService.cs
│   │   ├── Twilio/
│   │   │   └── TwilioSmsService.cs
│   │   └── Storage/
│   │       └── AzureBlobStorageService.cs
│   ├── BackgroundJobs/
│   │   ├── MonthlyBillingJob.cs
│   │   ├── DocumentRetentionJob.cs
│   │   └── ComplianceReportJob.cs
│   ├── Encryption/
│   │   └── AesEncryptionService.cs
│   └── DependencyInjection.cs
│
├── SafeNetQ.API/                          # API Layer (outermost)
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── KycController.cs
│   │   ├── ContributionController.cs
│   │   ├── AssistanceRequestController.cs
│   │   ├── PayoutController.cs
│   │   ├── DocumentController.cs
│   │   ├── CommunityFeedController.cs
│   │   ├── NotificationController.cs
│   │   ├── ProfileController.cs
│   │   ├── AdminController.cs
│   │   ├── ComplianceController.cs
│   │   └── FundHealthController.cs
│   ├── Middleware/
│   │   ├── ExceptionHandlingMiddleware.cs
│   │   ├── RequestLoggingMiddleware.cs
│   │   └── RateLimitingMiddleware.cs
│   ├── Filters/
│   │   ├── ApiExceptionFilterAttribute.cs
│   │   └── AuditActionFilter.cs
│   ├── Configuration/
│   │   ├── CorsConfiguration.cs
│   │   ├── SwaggerConfiguration.cs
│   │   └── HealthCheckConfiguration.cs
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── appsettings.Staging.json
│   ├── appsettings.Production.json
│   └── Program.cs
│
└── SafeNetQ.Shared/                       # Shared kernel
    ├── Constants/
    │   ├── Roles.cs
    │   ├── Permissions.cs
    │   └── ErrorCodes.cs
    └── Extensions/
        ├── StringExtensions.cs
        └── DateTimeExtensions.cs
```

---

## Web Frontend Structure (Next.js + TypeScript)

```
src/web/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .env.local
├── .env.example
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── locales/                    # i18n translation files
│       ├── en/
│       │   └── common.json
│       └── fr/
│           └── common.json
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   ├── (auth)/                 # Auth group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx
│   │   │   ├── kyc/
│   │   │   │   └── page.tsx
│   │   │   ├── select-tier/
│   │   │   │   └── page.tsx
│   │   │   ├── setup-payment/
│   │   │   │   └── page.tsx
│   │   │   └── onboarding-complete/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/            # Member dashboard group
│   │   │   ├── layout.tsx          # Sidebar layout
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── contributions/
│   │   │   │   └── page.tsx
│   │   │   ├── request-assistance/
│   │   │   │   └── page.tsx
│   │   │   ├── requests/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── payouts/
│   │   │   │   └── page.tsx
│   │   │   ├── community-feed/
│   │   │   │   └── page.tsx
│   │   │   ├── documents/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       ├── page.tsx
│   │   │       ├── profile/
│   │   │       ├── notifications/
│   │   │       └── language/
│   │   ├── (admin)/                # Admin dashboard group
│   │   │   ├── layout.tsx
│   │   │   ├── admin/
│   │   │   │   └── page.tsx
│   │   │   ├── admin/committee/
│   │   │   │   └── page.tsx
│   │   │   ├── admin/members/
│   │   │   │   └── page.tsx
│   │   │   ├── admin/aml-kyc/
│   │   │   │   └── page.tsx
│   │   │   ├── admin/audit/
│   │   │   │   └── page.tsx
│   │   │   ├── admin/reports/
│   │   │   │   └── page.tsx
│   │   │   └── admin/settings/
│   │   │       └── page.tsx
│   │   └── api/                    # API routes (BFF)
│   │       └── webhooks/
│   │           └── stripe/
│   │               └── route.ts
│   │
│   ├── components/
│   │   ├── ui/                     # Design system components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── NavItem.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MemberSidebar.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── MobileBottomNav.tsx
│   │   ├── auth/
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── KycUploadForm.tsx
│   │   │   └── TierSelector.tsx
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx
│   │   │   ├── ContributionList.tsx
│   │   │   ├── CommunityFeedCard.tsx
│   │   │   └── FundHealthIndicator.tsx
│   │   ├── requests/
│   │   │   ├── RequestForm.tsx
│   │   │   ├── CategorySelector.tsx
│   │   │   ├── RequestTimeline.tsx
│   │   │   └── DocumentUploader.tsx
│   │   └── admin/
│   │       ├── FundHealthDashboard.tsx
│   │       ├── MemberTable.tsx
│   │       ├── ReviewPanel.tsx
│   │       └── AuditTrailTable.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useContributions.ts
│   │   ├── useRequests.ts
│   │   ├── useNotifications.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── lib/
│   │   ├── api/                    # API client
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── contributions.ts
│   │   │   ├── requests.ts
│   │   │   └── admin.ts
│   │   ├── utils/
│   │   │   ├── formatCurrency.ts
│   │   │   ├── formatDate.ts
│   │   │   └── validators.ts
│   │   └── constants.ts
│   │
│   ├── stores/                     # State management (Zustand)
│   │   ├── authStore.ts
│   │   ├── notificationStore.ts
│   │   └── uiStore.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── types/
│       ├── user.ts
│       ├── contribution.ts
│       ├── request.ts
│       ├── payout.ts
│       └── api.ts
│
└── __tests__/                      # Component/page tests
    ├── components/
    └── pages/
```

---

## Mobile App Structure (React Native)

```
src/mobile/
├── package.json
├── app.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── .env
│
├── android/                        # Android native project
├── ios/                            # iOS native project
│
├── src/
│   ├── app/                        # Navigation & screens
│   │   ├── App.tsx
│   │   ├── navigation/
│   │   │   ├── RootNavigator.tsx
│   │   │   ├── AuthNavigator.tsx
│   │   │   ├── MainTabNavigator.tsx
│   │   │   └── types.ts
│   │   └── screens/
│   │       ├── auth/
│   │       │   ├── LoginScreen.tsx
│   │       │   ├── RegisterScreen.tsx
│   │       │   ├── KycScreen.tsx
│   │       │   └── TierSelectionScreen.tsx
│   │       ├── dashboard/
│   │       │   └── DashboardScreen.tsx
│   │       ├── contributions/
│   │       │   └── ContributionHistoryScreen.tsx
│   │       ├── requests/
│   │       │   ├── RequestAssistanceScreen.tsx
│   │       │   └── RequestDetailScreen.tsx
│   │       ├── feed/
│   │       │   └── CommunityFeedScreen.tsx
│   │       └── profile/
│   │           ├── ProfileScreen.tsx
│   │           └── SettingsScreen.tsx
│   │
│   ├── components/
│   │   ├── ui/                     # Shared UI components
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── requests/
│   │   └── feed/
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   ├── storage/
│   │   └── notifications/
│   ├── stores/
│   ├── styles/
│   │   └── theme.ts
│   └── types/
│
└── __tests__/
    └── screens/
```

---

## Tests Structure

```
tests/
├── e2e/
│   ├── web/                        # Playwright tests
│   │   ├── playwright.config.ts
│   │   ├── pages/                  # Page Object Models
│   │   │   ├── BasePage.ts
│   │   │   ├── LandingPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── RegisterPage.ts
│   │   │   ├── DashboardPage.ts
│   │   │   ├── ContributionPage.ts
│   │   │   ├── RequestAssistancePage.ts
│   │   │   ├── RequestStatusPage.ts
│   │   │   ├── CommunityFeedPage.ts
│   │   │   ├── ProfilePage.ts
│   │   │   ├── AdminDashboardPage.ts
│   │   │   └── CommitteeReviewPage.ts
│   │   ├── fixtures/
│   │   │   └── test-data.ts
│   │   └── specs/
│   │       ├── auth.spec.ts
│   │       ├── onboarding.spec.ts
│   │       ├── contributions.spec.ts
│   │       ├── request-assistance.spec.ts
│   │       ├── community-feed.spec.ts
│   │       └── admin.spec.ts
│   │
│   └── mobile/                     # Detox tests
│       ├── .detoxrc.js
│       ├── pages/                  # Page Object Models
│       │   ├── BasePage.ts
│       │   ├── LoginPage.ts
│       │   ├── DashboardPage.ts
│       │   ├── RequestPage.ts
│       │   ├── FeedPage.ts
│       │   └── ProfilePage.ts
│       └── specs/
│           ├── auth.e2e.ts
│           ├── dashboard.e2e.ts
│           ├── request.e2e.ts
│           └── feed.e2e.ts
│
├── integration/
│   └── SafeNetQ.IntegrationTests/  # .NET integration tests
│       ├── AuthTests.cs
│       ├── ContributionTests.cs
│       ├── RequestTests.cs
│       └── PayoutTests.cs
│
└── unit/                           # Covered within each .NET project
```

---

## Infrastructure

```
infra/
├── terraform/
│   ├── environments/
│   │   ├── dev/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── terraform.tfvars
│   │   ├── staging/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── terraform.tfvars
│   │   └── production/
│   │       ├── main.tf
│   │       ├── variables.tf
│   │       └── terraform.tfvars
│   └── modules/
│       ├── networking/
│       ├── database/
│       ├── app-service/
│       ├── storage/
│       ├── keyvault/
│       └── monitoring/
│
├── docker/
│   ├── Dockerfile.api
│   ├── Dockerfile.web
│   └── docker-compose.yml
│
└── k8s/                            # Optional Kubernetes
    ├── base/
    └── overlays/
        ├── dev/
        ├── staging/
        └── production/
```

---

## CI/CD (.github/workflows)

```
.github/
└── workflows/
    ├── ci-backend.yml              # Build, test, lint .NET backend
    ├── ci-web.yml                  # Build, test, lint Next.js frontend
    ├── ci-mobile.yml               # Build, test React Native
    ├── deploy-dev.yml              # Deploy to dev environment
    ├── deploy-staging.yml          # Deploy to staging
    ├── deploy-production.yml       # Deploy to production (manual trigger)
    └── security-scan.yml           # Dependency scanning, SAST
```
