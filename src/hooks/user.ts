import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ROLES } from "src/constants";
import axios from "src/lib/axios";

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`/users`);
  console.log({ response });
  return response.data.users;
};

export const useUsers = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return {
    users: data ?? ([] as User[]),
    isLoading,
    error,
  };
};

export const useStudents = (approved = false) => {
  const { users, isLoading } = useUsers();
  const students = useMemo(
    () =>
      users?.filter(
        (user: any) => user.role === ROLES.STUDENT && user.approved === approved
      ),
    [approved, users]
  );

  return {
    students: students ?? [],
    isLoading: isLoading || !students,
  };
};

export const useTeachers = (approved = false) => {
  const { users, isLoading } = useUsers();

  const teachers = useMemo(
    () =>
      users?.filter(
        (user: any) => user.role === ROLES.TEACHER && user.approved === approved
      ),
    [approved, users]
  );

  return {
    teachers: teachers ?? [],
    isLoading: isLoading || !teachers,
  };
};
