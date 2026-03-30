export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  tier: "bronze" | "silver" | "gold";
  status: "active" | "pending" | "suspended";
  kycVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contribution {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
  date: string;
  receiptUrl?: string;
}

export interface AssistanceRequest {
  id: string;
  userId: string;
  category: "medical" | "education" | "emergency" | "housing" | "other";
  title: string;
  description: string;
  amountRequested: number;
  amountApproved?: number;
  status: "draft" | "submitted" | "under_review" | "approved" | "disbursed" | "rejected" | "appealed";
  documents: Document[];
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface TimelineEvent {
  id: string;
  action: string;
  description: string;
  actor?: string;
  timestamp: string;
}

export interface Payout {
  id: string;
  requestId: string;
  recipientId: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed";
  disbursedAt?: string;
}

export interface FeedEntry {
  id: string;
  category: "medical" | "education" | "emergency" | "housing" | "other";
  title: string;
  description: string;
  amountDisbursed: number;
  date: string;
  region?: string;
}

export interface FundHealth {
  totalBalance: number;
  monthlyInflow: number;
  monthlyOutflow: number;
  activeMembers: number;
  pendingRequests: number;
  reserveRatio: number;
}

export interface AuditEntry {
  id: string;
  action: string;
  actor: string;
  target: string;
  details: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
