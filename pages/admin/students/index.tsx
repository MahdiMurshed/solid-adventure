import UserTable from "@components/tables/userTable";
import withAuth from "@components/withAuth";
import { useStudents } from "@hooks/user";
import { ROLES } from "src/constants";

const StudentsList = () => {
  const { students, isLoading } = useStudents(true);
  // console.log({ students });

  if (isLoading) {
    return null;
  }
  return <UserTable users={students} role={ROLES.STUDENT} />;
};

export default withAuth(StudentsList);
