"use client";

import { useQuery } from "@tanstack/react-query";
import * as requestsApi from "@/lib/api/requests";

export function useMyRequests(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["myRequests", page, pageSize],
    queryFn: () => requestsApi.getMyRequests({ page, pageSize }),
  });
}

export function useRequestDetails(id: string) {
  return useQuery({
    queryKey: ["request", id],
    queryFn: () => requestsApi.getDetails(id),
    enabled: !!id,
  });
}
