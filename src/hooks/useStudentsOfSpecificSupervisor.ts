import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";
import { Student } from "src/types";

export const fetchMaterials = async (
  // eslint-disable-next-line no-unused-vars
  supervisorId: string
): Promise<Student[]> => {
  const response = await axios.get(
    `users/supervisor?supervisorId=${supervisorId}`
  );

  return response.data.students;
};

export const useStudentsOfSpecificSupervisor = ({
  supervisorId,
}: {
  supervisorId: string;
}) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["materials", "supervisor", supervisorId],
    queryFn: () => fetchMaterials(supervisorId),
    enabled: !!supervisorId,
  });

  return {
    students: data ?? ([] as Student[]),
    isLoading,
    error,
  };
};
