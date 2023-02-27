import { useSession } from "next-auth/react";

import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { User as AuthUser } from "next-auth";
import axios from "src/lib/axios";

const fetchCurrentUser = async (userId: string): Promise<User> => {
  const response = await axios.get(`/users/${userId}`);

  return response.data.user;
};

const useCurrentUser = () => {
  const { data: session, status } = useSession();
  const user = session?.user as AuthUser;
  const { isLoading, data } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCurrentUser(user?.id),
    enabled: status === "authenticated" && !!user?.id,
    staleTime: 1000 * 60 * 30, // 24 hours
  });

  return {
    user: data as User,
    isLoading,
  };
};

export default useCurrentUser;
