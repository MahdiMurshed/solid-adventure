import { Category, Material } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ROLES } from "src/constants";
import axios from "src/lib/axios";

export type IMaterialOfUser = Material & {
  categories: Category[];
};

export const fetchMaterials = async (
  // eslint-disable-next-line no-unused-vars
  userId: string
): Promise<{
  authorMaterials: IMaterialOfUser[];
  supervisorMaterials: IMaterialOfUser[];
}> => {
  const response = await axios.get(`/users/materials?userId=${userId}`);

  return response.data;
};

export const useMaterialOfSpecificUser = ({
  userId,
  role = ROLES.STUDENT,
}: {
  userId: string;
  role?: string;
}) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["materials", userId],
    queryFn: () => fetchMaterials(userId),
    enabled: !!userId,
  });

  if (!data)
    return {
      authorMaterials: [] as IMaterialOfUser[],
      supervisorMaterials: [] as IMaterialOfUser[],
      isLoading,
      error,
      hasMaterials: false,
    };

  let hasMaterials = false;
  if (role === ROLES.STUDENT) {
    hasMaterials = data?.authorMaterials.length > 0;
  } else if (role === ROLES.TEACHER) {
    hasMaterials =
      data?.authorMaterials.length > 0 || data?.supervisorMaterials.length > 0;
  }

  return {
    authorMaterials: data.authorMaterials,
    supervisorMaterials: data.supervisorMaterials,
    isLoading,
    error,
    hasMaterials,
  };
};
