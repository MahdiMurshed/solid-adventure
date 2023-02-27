//hook to invalidate query
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useInvalidate = () => {
  const queryClient = useQueryClient();
  return useCallback(
    (queryKey: string[]) => {
      queryClient.invalidateQueries(queryKey);
    },
    [queryClient]
  );
};
