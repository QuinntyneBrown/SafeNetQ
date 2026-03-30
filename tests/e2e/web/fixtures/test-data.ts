export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
}

export interface ContributionData {
  id: string;
  date: string;
  amount: number;
  tier: string;
  status: "completed" | "pending" | "failed";
}

export interface AssistanceRequestData {
  category: string;
  description: string;
  amountRequested: number;
  documents: string[];
}

export interface AdminCredentials {
  email: string;
  password: string;
  mfaSecret: string;
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

export function validRegistration(overrides: Partial<RegistrationData> = {}): RegistrationData {
  return {
    firstName: "Thabo",
    lastName: "Mokoena",
    email: `thabo.mokoena+${Date.now()}@example.com`,
    phone: "+27612345678",
    password: "Str0ng!Pass#2024",
    acceptTerms: true,
    ...overrides,
  };
}

export function invalidRegistration(): RegistrationData {
  return {
    firstName: "",
    lastName: "",
    email: "not-an-email",
    phone: "123",
    password: "weak",
    acceptTerms: false,
  };
}

export function existingUserRegistration(): RegistrationData {
  return {
    firstName: "Existing",
    lastName: "User",
    email: "existing.user@example.com",
    phone: "+27601112222",
    password: "Str0ng!Pass#2024",
    acceptTerms: true,
  };
}

export function validLoginCredentials() {
  return {
    email: "thabo.mokoena@example.com",
    password: "Str0ng!Pass#2024",
  };
}

export function invalidLoginCredentials() {
  return {
    email: "thabo.mokoena@example.com",
    password: "WrongPassword!",
  };
}

export function adminCredentials(): AdminCredentials {
  return {
    email: "admin@safenetq.co.za",
    password: "Admin$ecure#2024",
    mfaSecret: "JBSWY3DPEHPK3PXP",
  };
}

export function sampleContributions(): ContributionData[] {
  return [
    {
      id: "CONTRIB-001",
      date: "2024-10-01",
      amount: 150,
      tier: "Standard",
      status: "completed",
    },
    {
      id: "CONTRIB-002",
      date: "2024-11-01",
      amount: 150,
      tier: "Standard",
      status: "completed",
    },
    {
      id: "CONTRIB-003",
      date: "2024-12-01",
      amount: 150,
      tier: "Standard",
      status: "pending",
    },
  ];
}

export function sampleAssistanceRequest(
  overrides: Partial<AssistanceRequestData> = {},
): AssistanceRequestData {
  return {
    category: "Medical Emergency",
    description:
      "Urgent hospital admission required for emergency surgery. " +
      "Attached medical reports and hospital admission letter.",
    amountRequested: 15_000,
    documents: ["medical-report.pdf", "admission-letter.pdf"],
    ...overrides,
  };
}

export const TIER_OPTIONS = [
  { name: "Basic", monthlyAmount: 100, description: "Essential coverage" },
  { name: "Standard", monthlyAmount: 150, description: "Recommended coverage" },
  { name: "Premium", monthlyAmount: 250, description: "Maximum coverage" },
] as const;

export const EMERGENCY_CATEGORIES = [
  "Medical Emergency",
  "Funeral Assistance",
  "Natural Disaster",
  "Fire Damage",
  "Crime Victim Support",
  "Education Crisis",
] as const;
