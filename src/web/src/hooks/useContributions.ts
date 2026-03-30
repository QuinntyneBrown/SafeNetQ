"use client";

import { useQuery } from "@tanstack/react-query";
import * as contributionsApi from "@/lib/api/contributions";

export function useContributionHistory(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["contributions", page, pageSize],
    queryFn: () => contributionsApi.getHistory({ page, pageSize }),
  });
}
