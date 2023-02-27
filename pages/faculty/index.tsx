import CustomLoader from "@components/CustomLoader";
import Heading from "@components/Headings";
import Layout from "@components/layout";
import { Search } from "@components/layout/Search";
import { UserInfoIcons } from "@components/users/UserCard";
import { useUserFilter } from "@hooks/useUserFilter";
import { useState } from "react";

const FacultyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { filteredTeachers: teachers, isLoading } = useUserFilter({
    filter: searchQuery,
  });

  if (isLoading) return <CustomLoader />;

  return (
    <Layout>
      <div className="w-6/12 mx-auto shadow-md rounded-lg p-4 min-h-[90vh]">
        <div className="flex justify-between">
          <Heading variant="h1">Faculty Members</Heading>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            className="w-1/2"
            placeholder="Search user"
          />
        </div>
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border-[1px] p-4 rounded-lg shadow-sm"
          >
            <UserInfoIcons
              title=""
              name={teacher.name as string}
              userId={teacher.id as string}
              contactNumber={teacher.contactNumber as string}
              email={teacher.email as string}
              image={teacher.image as string}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FacultyPage;
