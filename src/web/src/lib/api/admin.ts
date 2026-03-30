import apiClient from "./client";

export async function getMembers(params?: { page?: number; pageSize?: number; status?: string }) {
  const res = await apiClient.get("/admin/members", { params });
  return res.data;
}

export async function getFundHealth() {
  const res = await apiClient.get("/admin/fund-health");
  return res.data;
}

export async function getAuditTrail(params?: { page?: number; pageSize?: number }) {
  const res = await apiClient.get("/admin/audit-trail", { params });
  return res.data;
}
