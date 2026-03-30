# Contributing to SafeNetQ

Thank you for your interest in contributing to SafeNetQ! This document provides guidelines and information to help you get started.

## Code of Conduct

By participating in this project, you agree to treat all contributors with respect and foster an inclusive, welcoming community.

## How to Contribute

### Reporting Bugs

1. Check [existing issues](https://github.com/your-org/SafeNetQ/issues) to avoid duplicates
2. Open a new issue with:
   - A clear, descriptive title
   - Steps to reproduce the bug
   - Expected vs. actual behavior
   - Environment details (OS, browser, .NET version, Node version)

### Suggesting Features

1. Open an issue with the **feature request** label
2. Describe the use case and why it would benefit the community
3. If possible, outline a proposed implementation approach

### Submitting Pull Requests

1. **Fork** the repository and create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow the project structure** — place code in the appropriate layer:
   - Domain logic in `SafeNetQ.Domain`
   - Application services in `SafeNetQ.Application`
   - Infrastructure concerns in `SafeNetQ.Infrastructure`
   - API endpoints in `SafeNetQ.API`
   - Frontend components in `src/web/src/components`

3. **Write tests** for your changes:
   - Unit tests for domain and application logic
   - Integration tests for infrastructure and API endpoints
   - E2E tests for user-facing features (Playwright for web, Detox for mobile)

4. **Ensure all tests pass** before submitting:
   ```bash
   # Backend
   cd src/backend && dotnet test

   # Web E2E
   cd tests/e2e/web && npx playwright test
   ```

5. **Open a pull request** against `main` with:
   - A clear description of the changes
   - Reference to any related issues
   - Screenshots for UI changes

## Development Setup

See the [Getting Started](README.md#getting-started) section in the README for environment setup instructions.

### Backend (.NET)

- Follow Clean Architecture principles — dependencies flow inward
- Use MediatR for commands and queries
- Add FluentValidation validators for all commands
- Use AutoMapper for DTO mappings

### Frontend (Next.js)

- Use the App Router with server components where appropriate
- State management via Zustand stores
- API calls through TanStack React Query + Axios
- Style with Tailwind CSS v4 utility classes

### Database

- Use EF Core migrations for schema changes:
  ```bash
  cd src/backend
  dotnet ef migrations add YourMigrationName --project SafeNetQ.Infrastructure --startup-project SafeNetQ.API
  ```

## Coding Standards

- **C#**: Follow [Microsoft C# coding conventions](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- **TypeScript/React**: Follow the existing ESLint and Prettier configuration in `src/web`
- Keep methods focused and small
- Prefer descriptive names over comments
- No secrets, credentials, or environment-specific values in committed code

## Security

SafeNetQ handles sensitive financial and identity data. When contributing:

- Never log or expose PII (personally identifiable information)
- Use parameterized queries — no string concatenation for SQL
- Validate all user input at the API boundary
- Follow the encryption patterns already in place for document storage
- Report security vulnerabilities privately — do **not** open a public issue. Email the maintainers directly.

## Compliance Considerations

Changes that affect data handling, payments, or identity verification must account for:

- **FINTRAC** — KYC/AML requirements
- **PIPEDA** — Privacy and data residency in Canada
- **AODA** — WCAG 2.0 Level AA accessibility

If you're unsure whether your change has compliance implications, ask in the PR.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
