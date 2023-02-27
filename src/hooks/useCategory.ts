import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";

const fetchCurrentUser = async (categoryId: string): Promise<Category> => {
  const response = await axios.get(`/categories/${categoryId}`);

  return response.data.material;
};

const useCategory = ({ categoryId }: { categoryId: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => fetchCurrentUser(categoryId),
    enabled: !!categoryId,
  });

  return {
    category: data as Category,
    isLoading,
  };
};

export default useCategory;
