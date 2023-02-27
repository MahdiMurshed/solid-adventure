import UserTable from "@components/tables/userTable";
import withAuth from "@components/withAuth";
import { useTeachers } from "@hooks/user";
import { ROLES } from "src/constants";

const TeachersList = () => {
  const { teachers, isLoading } = useTeachers(true);
  console.log({ teachers });

  if (isLoading) {
    return null;
  }
  return <UserTable users={teachers} role={ROLES.TEACHER} />;
};

export default withAuth(TeachersList);
