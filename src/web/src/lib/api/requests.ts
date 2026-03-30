import apiClient from "./client";

export async function submit(data: FormData) {
  const res = await apiClient.post("/requests", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function getDetails(id: string) {
  const res = await apiClient.get(`/requests/${id}`);
  return res.data;
}

export async function getMyRequests(params?: { page?: number; pageSize?: number }) {
  const res = await apiClient.get("/requests/me", { params });
  return res.data;
}

export async function castVote(requestId: string, vote: "approve" | "reject") {
  const res = await apiClient.post(`/requests/${requestId}/vote`, { vote });
  return res.data;
}

export async function appeal(requestId: string, reason: string) {
  const res = await apiClient.post(`/requests/${requestId}/appeal`, { reason });
  return res.data;
}
