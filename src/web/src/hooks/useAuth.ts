"use client";

import { useAuthStore } from "@/stores/authStore";
import * as authApi from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const { user, isAuthenticated, setUser, setTokens, logout: clearAuth } = useAuthStore();
  const router = useRouter();

  const login = useCallback(
    async (email: string, password: string, mfaCode?: string) => {
      const data = await authApi.login({ email, password, mfaCode });
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push("/dashboard");
    },
    [setTokens, setUser, router]
  );

  const register = useCallback(
    async (payload: { email: string; password: string; firstName: string; lastName: string }) => {
      const data = await authApi.register(payload);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push("/kyc");
    },
    [setTokens, setUser, router]
  );

  const logout = useCallback(() => {
    clearAuth();
    router.push("/login");
  }, [clearAuth, router]);

  return { user, isAuthenticated, login, register, logout };
}
