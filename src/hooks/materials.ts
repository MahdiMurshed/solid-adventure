import { Material } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";
import { IMaterialWithCategories } from "src/types";

export const fetchMaterials = async (): Promise<Material[]> => {
  const response = await axios.get(`/materials`);
  console.log({ response });
  return response.data.materials;
};

export const useMaterials = ({ key = "all" }: { key: string }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["materials", key],
    queryFn: fetchMaterials,
  });

  return {
    materials: data ?? ([] as Material[]),
    isLoading,
    error,
  };
};

export const useNonApprovedMaterials = () => {
  const { isLoading, materials } = useMaterials({ key: "nonApproved" });
  const nonApprovedMaterials = materials?.filter(
    (material) => material.approved === false
  );

  return {
    materials: nonApprovedMaterials ?? ([] as Material[]),
    isLoading,
  };
};

export const useApprovedMaterials = () => {
  const { isLoading, materials } = useMaterials({ key: "approved" });
  const approvedMaterials = materials?.filter(
    (material) => material.approved === true
  );

  return {
    materials: approvedMaterials ?? ([] as Material[]),
    isLoading,
  };
};

export const fetchTopMaterials = async (): Promise<
  IMaterialWithCategories[]
> => {
  const response = await axios.get(`/materials/top-materials`);
  return response.data.topMaterials;
};

export const useTopMaterials = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["materials", "top"],
    queryFn: fetchTopMaterials,
  });

  return {
    materials: data ?? ([] as IMaterialWithCategories[]),
    isLoading,
    error,
  };
};
