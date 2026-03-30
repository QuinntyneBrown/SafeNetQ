import apiClient from "./client";

export async function getHistory(params?: { page?: number; pageSize?: number }) {
  const res = await apiClient.get("/contributions", { params });
  return res.data;
}

export async function setupPayment(data: { method: string; details: Record<string, string> }) {
  const res = await apiClient.post("/contributions/payment-method", data);
  return res.data;
}

export async function changeTier(tier: "bronze" | "silver" | "gold") {
  const res = await apiClient.put("/contributions/tier", { tier });
  return res.data;
}
