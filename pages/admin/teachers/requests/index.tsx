import UserTable from "@components/tables/userTable";
import withAuth from "@components/withAuth";
import { useTeachers } from "@hooks/user";

const TeacherRequests = () => {
  const { teachers, isLoading } = useTeachers();
  // console.log({ teachers });

  if (isLoading) {
    return null;
  }
  return <UserTable users={teachers} />;
};

export default withAuth(TeacherRequests);
