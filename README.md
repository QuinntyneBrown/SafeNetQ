# SafeNetQ

**Community Emergency Mutual Aid Platform** — Ontario, Canada

A subscription-based mutual aid platform where community members contribute monthly and receive financial assistance during verified emergencies. Not insurance — mutual aid, modernized.

## Overview

SafeNetQ draws on the tradition of rotating savings and credit associations (ROSCAs), mutual benefit societies, and diaspora community aid structures. It modernizes these concepts with digital governance, transparent fund management, and AI-assisted verification.

## Features

### Member-Facing
- **Onboarding & KYC** — FINTRAC-compliant identity verification
- **Contribution Management** — Tiered monthly contributions via PAD, credit card, or Interac
- **Assistance Requests** — Submit emergency requests with document upload
- **Request Tracking** — Real-time status timeline (Submitted → Under Review → Approved → Paid)
- **Community Feed** — Anonymized feed showing how the community helps
- **Document Vault** — Encrypted document storage
- **Multi-language Support** — English, French, and community languages

### Admin & Governance
- **Fund Health Dashboard** — Real-time trust/reserve/operating account balances
- **Committee Review** — Voting workflow for assistance requests
- **Member Management** — KYC status, suspension, audit trails
- **AML/KYC Compliance** — FINTRAC reporting (STRs, large transaction reports)
- **RBAC** — Admin, Committee Member, Treasurer, Auditor, Compliance Officer, Member

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend API | .NET 8+ (C#), Clean Architecture, MediatR, EF Core |
| Database | PostgreSQL |
| Web Frontend | Next.js 14+ (React), TypeScript, Tailwind CSS |
| Mobile App | React Native |
| Authentication | JWT + MFA (TOTP/SMS) |
| Payments | Stripe (PAD, credit card, Interac e-Transfer) |
| Identity Verification | Jumio / Onfido |
| File Storage | Azure Blob Storage (Canada Central, AES-256) |
| Email / SMS | SendGrid / Twilio |
| Hosting | Azure Canada Central (PIPEDA compliant) |
| CI/CD | GitHub Actions |

## Project Structure

```
SafeNetQ/
├── docs/                    # Requirements, designs, PlantUML diagrams
│   ├── specs/               # L1 & L2 requirements
│   ├── detailed-designs/    # 12 feature area designs with diagrams
│   └── ui-design.pen        # Pencil UI design file
├── src/
│   ├── backend/             # .NET 8+ Clean Architecture
│   ├── web/                 # Next.js web frontend
│   └── mobile/              # React Native mobile app
├── tests/
│   └── e2e/                 # Playwright (web) + Detox (mobile)
├── infra/                   # Docker, Terraform, CI/CD
└── .github/workflows/       # GitHub Actions pipelines
```

See [docs/solution-folder-hierarchy.md](docs/solution-folder-hierarchy.md) for the complete folder structure.

## Getting Started

### Prerequisites
- .NET 8+ SDK
- Node.js 22+
- PostgreSQL 16+
- Docker & Docker Compose

### Development

```bash
# Start infrastructure (DB, Redis)
cd infra/docker && docker compose up -d db redis

# Run backend
cd src/backend && dotnet run --project SafeNetQ.API

# Run web frontend
cd src/web && npm install && npm run dev
```

### Running Tests

```bash
# E2E web tests (Playwright)
cd tests/e2e/web && npm install && npx playwright test

# E2E mobile tests (Detox)
cd tests/e2e/mobile && npm install && npm run test:ios
```

## Legal

This platform is structured as a **voluntary mutual aid arrangement** — not insurance. It is designed to comply with:
- FINTRAC (KYC/AML, MSB registration)
- PIPEDA (privacy, data residency in Canada)
- Ontario Consumer Protection Act
- AODA (WCAG 2.0 Level AA accessibility)

**Disclaimer:** This is not an insurance product. Payouts are not guaranteed and are subject to fund availability and community governance decisions.

## License

Confidential — Internal Use Only
