# SafeNetQ — Hosting Cost Estimates

## Overview

SafeNetQ is hosted on **Azure Canada Central** (Toronto) to comply with PIPEDA data residency requirements. All data resides in Canadian data centers. Costs are estimated monthly in CAD.

---

## Architecture Summary

| Component | Service | Purpose |
|-----------|---------|---------|
| Backend API | Azure App Service | .NET 8+ REST API |
| Web Frontend | Azure Static Web Apps / Vercel | Next.js SSR/SSG |
| Database | Azure Database for PostgreSQL | Primary data store |
| Cache | Azure Cache for Redis | Session cache, rate limiting |
| File Storage | Azure Blob Storage | Document vault (encrypted) |
| Identity | Azure AD B2C / Keycloak on AKS | Authentication, MFA |
| Key Vault | Azure Key Vault | Secrets, encryption keys |
| Monitoring | Azure Monitor + App Insights | Logging, alerting, APM |
| CDN | Azure CDN | Static asset delivery |
| Email | SendGrid | Transactional email |
| SMS | Twilio | SMS notifications |
| CI/CD | GitHub Actions | Build and deploy pipelines |

---

## Development Environment

Target: Internal development and testing. Single instance, minimal redundancy.

| Service | SKU / Tier | Specs | Monthly Cost (CAD) |
|---------|------------|-------|-------------------|
| **App Service (API)** | B1 Basic | 1 core, 1.75 GB RAM | $18 |
| **App Service (Web)** | Free / Vercel Hobby | Static hosting | $0 |
| **PostgreSQL** | Burstable B1ms | 1 vCore, 2 GB RAM, 32 GB storage | $25 |
| **Redis Cache** | Basic C0 | 250 MB | $22 |
| **Blob Storage** | Standard LRS | 10 GB estimate | $3 |
| **Key Vault** | Standard | Secrets + keys | $1 |
| **App Insights** | Free tier | 5 GB/month ingestion | $0 |
| **SendGrid** | Free tier | 100 emails/day | $0 |
| **Twilio** | Pay-as-you-go | ~100 SMS/month | $10 |
| **GitHub Actions** | Free tier | 2,000 min/month | $0 |
| **Domain + DNS** | Azure DNS | 1 zone | $1 |
| **Container Registry** | Basic | For Docker images | $7 |

### Dev Total: ~$87 CAD/month

---

## Staging Environment

Target: Pre-production testing, QA, demo. Mirrors production architecture at reduced scale.

| Service | SKU / Tier | Specs | Monthly Cost (CAD) |
|---------|------------|-------|-------------------|
| **App Service (API)** | S1 Standard | 1 core, 1.75 GB RAM, auto-scale | $95 |
| **App Service (Web)** | S1 Standard / Vercel Pro | SSR hosting | $27 |
| **PostgreSQL** | General Purpose D2s_v3 | 2 vCores, 8 GB RAM, 64 GB storage | $175 |
| **Redis Cache** | Standard C1 | 1 GB, replication | $85 |
| **Blob Storage** | Standard LRS | 50 GB estimate | $12 |
| **Key Vault** | Standard | Secrets + keys + certificates | $5 |
| **App Insights** | Pay-as-you-go | ~10 GB/month | $30 |
| **Azure Monitor** | Basic alerts | 5 alert rules | $5 |
| **SendGrid** | Essentials 40K | 40,000 emails/month | $25 |
| **Twilio** | Pay-as-you-go | ~500 SMS/month | $40 |
| **GitHub Actions** | Team plan | 3,000 min/month | $5 |
| **SSL Certificate** | App Service Managed | Auto-renewal | $0 |
| **Container Registry** | Standard | Geo-replication not needed | $28 |

### Staging Total: ~$532 CAD/month

---

## Production Environment

Target: Live platform serving 500-2,000+ members. High availability, redundancy, compliance-ready.

| Service | SKU / Tier | Specs | Monthly Cost (CAD) |
|---------|------------|-------|-------------------|
| **App Service (API)** | P1v3 Premium | 2 cores, 8 GB RAM, auto-scale (2-4 instances) | $280 |
| **App Service (Web)** | P1v3 Premium / Vercel Pro | SSR with edge functions | $135 |
| **PostgreSQL** | General Purpose D4s_v3 | 4 vCores, 16 GB RAM, 256 GB storage, HA | $520 |
| **PostgreSQL Read Replica** | General Purpose D2s_v3 | 2 vCores (reporting queries) | $175 |
| **Redis Cache** | Premium P1 | 6 GB, clustering, persistence | $340 |
| **Blob Storage** | Standard GRS | 200 GB, geo-redundant | $50 |
| **Key Vault** | Premium | HSM-backed keys for encryption | $15 |
| **App Insights** | Pay-as-you-go | ~50 GB/month | $150 |
| **Azure Monitor** | Full suite | Alerts, dashboards, log analytics | $85 |
| **Azure Front Door** | Standard | WAF, DDoS protection, CDN | $150 |
| **SendGrid** | Pro 100K | 100,000 emails/month | $120 |
| **Twilio** | Pay-as-you-go | ~2,000 SMS/month | $120 |
| **Stripe** | Pay-as-you-go | 2.9% + $0.30/transaction | Variable* |
| **Jumio / Onfido** | Pay-per-verification | ~$2-5 per KYC check | Variable** |
| **GitHub Actions** | Team plan | 3,000 min/month | $5 |
| **SSL Certificate** | App Service Managed | Auto-renewal | $0 |
| **Container Registry** | Premium | Geo-replication | $70 |
| **Azure Backup** | Standard | DB + Blob backup, 30-day retention | $45 |
| **Log Analytics Workspace** | Pay-as-you-go | Compliance audit logs, 1-year retention | $80 |
| **DDoS Protection** | Basic (included) | Network-level protection | $0 |

### Production Fixed Total: ~$2,340 CAD/month

*Stripe variable costs (estimated for 500 members at $50/month):
- 500 transactions × ($0.30 + 2.9%) = $150 + $725 = ~$875 CAD/month
- This is a pass-through cost funded by the 5% platform fee

**Jumio/Onfido variable costs (estimated):
- 50 new member verifications/month × $3.50 = ~$175 CAD/month

### Production All-In Estimate: ~$3,390 CAD/month (with 500 members)

---

## Cost Comparison by Environment

| Environment | Monthly Cost (CAD) | Annual Cost (CAD) |
|-------------|-------------------|-------------------|
| **Development** | $87 | $1,044 |
| **Staging** | $532 | $6,384 |
| **Production** | $2,340 (fixed) | $28,080 |
| **Production** (all-in w/ 500 members) | $3,390 | $40,680 |

### Combined (Dev + Staging + Production): ~$3,960 CAD/month / ~$47,520 CAD/year

---

## Revenue vs. Cost Analysis (at 500 members)

| Metric | Monthly |
|--------|---------|
| Member contributions (500 × $50) | $25,000 |
| Platform fee revenue (5%) | $1,250 |
| Fixed hosting costs | $2,340 |
| Variable costs (Stripe + KYC) | $1,050 |
| **Total operating cost** | **$3,390** |
| **Net before payroll** | **-$2,140** |

Break-even requires approximately **1,350 members** at the $50/month tier for hosting costs to be covered by platform fees alone. Grant funding, institutional partnerships, and premium tiers will supplement revenue during the growth phase.

---

## Cost Optimization Strategies

1. **Reserved Instances**: Azure RI (1-year) saves 30-40% on App Service and PostgreSQL → ~$700/month savings in production
2. **Auto-scaling**: Scale API instances down during off-peak hours (nights, weekends)
3. **Blob lifecycle policies**: Move old documents to Cool/Archive storage tier after 6 months
4. **SendGrid/Twilio batching**: Batch notifications to reduce per-message costs
5. **Vercel for web**: Consider Vercel Pro ($20/month) instead of Azure App Service for the Next.js frontend
6. **Startup credits**: Azure for Startups offers $5,000-$150,000 in free credits
7. **Nonprofit pricing**: Azure Nonprofit offers significant discounts if registered as Ontario Not-for-Profit

---

## Compliance Costs (Non-Hosting)

| Item | Estimated Annual Cost (CAD) |
|------|---------------------------|
| FINTRAC Compliance Officer (contract) | $15,000 - $25,000 |
| Annual Financial Audit | $8,000 - $15,000 |
| Penetration Testing | $10,000 - $20,000 |
| Legal Counsel (retainer) | $12,000 - $24,000 |
| D&O Insurance | $3,000 - $5,000 |
| E&O Insurance | $2,000 - $4,000 |
| Cyber Liability Insurance | $3,000 - $6,000 |

### Total Compliance: ~$53,000 - $99,000 CAD/year
