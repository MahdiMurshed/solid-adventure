import { Category, Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";

interface ICategory extends Category {
  tags: Tag[];
}

const fetchCategories = async (): Promise<ICategory[]> => {
  const response = await axios.get(`/admin/categories`);

  return response.data.categories;
};

const useCategories = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  return {
    categories: data ?? ([] as ICategory[]),
    isLoading,
  };
};

export default useCategories;
