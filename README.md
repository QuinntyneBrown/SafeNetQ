<p align="center">
  <img src="docs/screenshots/community-banner.png" alt="SafeNetQ — Community Mutual Aid" width="600" />
</p>

<h1 align="center">SafeNetQ</h1>

<p align="center">
  <strong>Community Emergency Mutual Aid Platform</strong> — Ontario, Canada
</p>

<p align="center">
  <a href="#features">Features</a> &middot;
  <a href="#tech-stack">Tech Stack</a> &middot;
  <a href="#getting-started">Getting Started</a> &middot;
  <a href="#architecture">Architecture</a> &middot;
  <a href="#contributing">Contributing</a> &middot;
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8+-512BD4?logo=dotnet" alt=".NET 8+" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL 16" />
  <img src="https://img.shields.io/badge/React_Native-mobile-61DAFB?logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
</p>

---

SafeNetQ modernizes traditional mutual aid concepts — rotating savings and credit associations (ROSCAs), mutual benefit societies, and diaspora community aid structures — with digital governance, transparent fund management, and AI-assisted verification.

> **This is not insurance.** SafeNetQ is a subscription-based voluntary mutual aid arrangement where community members contribute monthly and receive financial assistance during verified emergencies. Payouts are not guaranteed and are subject to fund availability and community governance decisions.

## Features

### For Members

- **Onboarding & KYC** — FINTRAC-compliant identity verification with document upload and liveness checks
- **Contribution Management** — Tiered monthly contributions via PAD, credit card, or Interac e-Transfer
- **Assistance Requests** — Submit emergency requests with supporting documents across categories (Medical, Housing, Income Loss, Funeral, Domestic Crisis)
- **Real-time Tracking** — Follow your request through every stage: Draft > Submitted > Under Review > Approved > Paid
- **Community Feed** — Anonymized view of how the community helps its members
- **Document Vault** — AES-256 encrypted storage with time-limited access
- **Multi-language** — English, French, and community languages

### For Admins & Governance

- **Fund Health Dashboard** — Real-time trust, reserve, and operating account balances with health indicators
- **Committee Review & Voting** — Five-member panels review requests; majority vote (3 of 5) determines approval
- **Appeals Process** — Members can appeal denials within 14 days to a fresh review panel
- **Member Management** — KYC status tracking, suspension, comprehensive audit trails
- **AML/KYC Compliance** — FINTRAC reporting (STRs, large transaction reports)
- **Role-Based Access** — Admin, Committee Member, Treasurer, Auditor, Compliance Officer, Member

## Architecture

<p align="center">
  <img src="docs/screenshots/architecture-context.png" alt="C4 Context Diagram" width="550" />
</p>
<p align="center"><em>System context — SafeNetQ and its external integrations</em></p>

### Assistance Request Workflow

The core of SafeNetQ is the assistance request lifecycle, governed by community committee voting:

<p align="center">
  <img src="docs/screenshots/request-workflow.png" alt="Assistance Request State Machine" width="500" />
</p>
<p align="center"><em>Full request lifecycle — from draft through committee review, appeals, and payout</em></p>

### Member Dashboard Components

<p align="center">
  <img src="docs/screenshots/dashboard-components.png" alt="Dashboard Component Diagram" width="650" />
</p>
<p align="center"><em>C4 component diagram — member dashboard bounded context</em></p>

### Fund Health Governance

The platform continuously monitors fund health and automatically adjusts policies based on reserve ratios:

<p align="center">
  <img src="docs/screenshots/fund-health-states.png" alt="Fund Health State Machine" width="420" />
</p>
<p align="center"><em>Fund health states — Healthy, Caution, and Critical thresholds</em></p>

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend API** | .NET 8+ (C#), Clean Architecture, MediatR, EF Core, FluentValidation |
| **Database** | PostgreSQL 16 |
| **Web Frontend** | Next.js 16 (React 19), TypeScript, Tailwind CSS v4, Zustand, TanStack Query |
| **Mobile App** | React Native |
| **Authentication** | JWT + MFA (TOTP / SMS) |
| **Payments** | Stripe (PAD, credit card, Interac e-Transfer) |
| **Identity Verification** | Jumio / Onfido (KYC) |
| **File Storage** | Azure Blob Storage (Canada Central, AES-256) |
| **Email / SMS** | SendGrid / Twilio |
| **Hosting** | Azure Canada Central (PIPEDA compliant) |
| **CI/CD** | GitHub Actions |

## Project Structure

```
SafeNetQ/
├── docs/
│   ├── specs/                  # L1 & L2 requirements
│   ├── detailed-designs/       # 12 feature-area designs with diagrams
│   └── ui-design.pen           # UI design file
├── src/
│   ├── backend/                # .NET 8+ Clean Architecture
│   │   ├── SafeNetQ.Domain/        # Entities, value objects, domain events
│   │   ├── SafeNetQ.Application/   # Commands, queries, handlers, validators
│   │   ├── SafeNetQ.Infrastructure/ # EF Core, external service adapters
│   │   ├── SafeNetQ.API/           # Controllers, middleware, configuration
│   │   └── SafeNetQ.Shared/        # Shared kernel
│   ├── web/                    # Next.js 16 (App Router)
│   └── mobile/                 # React Native
├── tests/
│   ├── e2e/web/                # Playwright tests
│   ├── e2e/mobile/             # Detox tests
│   └── integration/            # .NET integration tests
├── infra/
│   ├── docker/                 # Docker Compose stack
│   └── terraform/              # Infrastructure as code
└── .github/workflows/          # CI/CD pipelines
```

See [`docs/solution-folder-hierarchy.md`](docs/solution-folder-hierarchy.md) for the complete breakdown.

## Getting Started

### Prerequisites

- [.NET 8+ SDK](https://dotnet.microsoft.com/download)
- [Node.js 22+](https://nodejs.org/)
- [PostgreSQL 16+](https://www.postgresql.org/)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/SafeNetQ.git
cd SafeNetQ

# 2. Start infrastructure (PostgreSQL, Redis)
cd infra/docker
docker compose up -d db redis

# 3. Run the backend API (http://localhost:5000)
cd ../../src/backend
dotnet run --project SafeNetQ.API

# 4. Run the web frontend (http://localhost:3000)
cd ../web
npm install
npm run dev
```

### Running Tests

```bash
# Backend unit & integration tests
cd src/backend
dotnet test

# E2E web tests (Playwright)
cd tests/e2e/web
npm install
npx playwright install
npx playwright test

# E2E mobile tests (Detox)
cd tests/e2e/mobile
npm install
npm run test:ios
```

### Docker Compose (full stack)

```bash
cd infra/docker
docker compose up
```

This starts PostgreSQL (5432), Redis (6379), the .NET API (5000), and the Next.js frontend (3000).

## Compliance & Legal

SafeNetQ is designed to comply with Canadian regulatory requirements:

| Regulation | Scope |
|------------|-------|
| **FINTRAC** | KYC/AML, MSB registration, suspicious transaction reporting |
| **PIPEDA** | Privacy, data residency in Canada, right to data export/deletion |
| **Ontario Consumer Protection Act** | Clear terms, cooling-off periods, dispute resolution |
| **AODA** | WCAG 2.0 Level AA accessibility |

> **Disclaimer:** This is not an insurance product. Payouts are not guaranteed and are subject to fund availability and community governance decisions.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved.

## License

This project is licensed under the [MIT License](LICENSE).
