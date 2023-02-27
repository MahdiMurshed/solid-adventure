import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";
import { IMaterial } from "src/types";

export const fetchMaterials = async (
  categoryId: string
): Promise<IMaterial[]> => {
  const response = await axios.get(`/materials/categories/${categoryId}`);
  console.log({ response });
  return response.data.materials;
};

export const useMaterialOfSpecificCategory = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["materials", categoryId],
    queryFn: () => fetchMaterials(categoryId),
    enabled: !!categoryId,
  });

  return {
    materials: data ?? ({} as IMaterial[]),
    isLoading,
    error,
  };
};
