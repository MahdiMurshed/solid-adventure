import { Notice } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";

const fetchNotices = async (userId: string): Promise<Notice[]> => {
  const response = await axios.get(`/notice/${userId}`);

  return response.data.notices;
};

const useNoticesByUser = ({ userId }: { userId: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["notices", userId],
    queryFn: () => fetchNotices(userId),
  });

  return {
    notices: data ?? ([] as Notice[]),
    isLoading,
  };
};

export default useNoticesByUser;
