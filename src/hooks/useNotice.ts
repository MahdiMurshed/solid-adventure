import { Notice } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";

const fetchNotices = async (): Promise<Notice[]> => {
  const response = await axios.get(`/notice`);

  return response.data.notices;
};

const useNotices = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["notices"],
    queryFn: () => fetchNotices(),
  });

  return {
    notices: data ?? ([] as Notice[]),
    isLoading,
  };
};

export default useNotices;
