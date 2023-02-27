import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";

const fetchTags = async (): Promise<Tag[]> => {
  const response = await axios.get(`/admin/tags`);

  return response.data.tags;
};

const useTags = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  });

  return {
    tags: data ?? ([] as Tag[]),
    isLoading,
  };
};

export default useTags;
