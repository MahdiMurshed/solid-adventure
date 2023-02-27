import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";
import { IMaterial } from "src/types";

const fetchMaterial = async (materialId: string): Promise<IMaterial> => {
  const response = await axios.get(`/materials/${materialId}`);
  console.log({ response });
  return response.data.material;
};

export const useMaterial = ({ materialId }: { materialId: string }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["materials", materialId],
    queryFn: () => fetchMaterial(materialId),
    enabled: !!materialId,
  });

  return {
    material: data ?? ({} as IMaterial),
    isLoading,
    error,
  };
};
