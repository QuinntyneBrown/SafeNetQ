import apiClient from "./client";

export async function register(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  const res = await apiClient.post("/auth/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string; mfaCode?: string }) {
  const res = await apiClient.post("/auth/login", data);
  return res.data;
}

export async function refreshToken(token: string) {
  const res = await apiClient.post("/auth/refresh", { refreshToken: token });
  return res.data;
}

export async function resetPassword(email: string) {
  const res = await apiClient.post("/auth/reset-password", { email });
  return res.data;
}
