import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";

const fetchUsers = async (userIds: string[]): Promise<User[]> => {
  const response = await axios.put(`/users`, userIds);
  console.log({ response });
  return response.data.users;
};

export const useUsersOfIds = ({ userIds }: { userIds: string[] }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users", userIds],
    queryFn: () => fetchUsers(userIds),
  });

  return {
    users: data ?? ([] as User[]),
    isLoading,
    error,
  };
};
