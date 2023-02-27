import { User } from "@prisma/client";
import { useTeachers } from "./user";

const filterTeacher = (teachers: User[], filter: string) =>
  teachers?.filter(
    (teacher: any) =>
      teacher.name.toLowerCase().includes(filter) ||
      teacher.email.toLowerCase().includes(filter) ||
      teacher.contactNumber.toLowerCase().includes(filter)
  );

export const useUserFilter = ({ filter }: { filter: string }) => {
  const { teachers, isLoading: teachersLoading } = useTeachers(true);
  const filterTrimmed = filter.trim().toLowerCase();

  const filteredTeachers = filterTeacher(teachers, filterTrimmed);

  return {
    filteredTeachers: filteredTeachers ?? [],
    isLoading: teachersLoading,
  };
};
