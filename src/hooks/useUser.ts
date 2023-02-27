import { Tag, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";

type IUser = User & {
  researchInterests: Tag[];
};

const fetchCurrentUser = async (userId: string): Promise<IUser> => {
  const response = await axios.get(`/users/${userId}`);

  return response.data.user;
};

const useUser = ({ userId }: { userId: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchCurrentUser(userId),
    enabled: !!userId,
  });

  return {
    user: data as IUser,
    isLoading,
  };
};

export default useUser;
