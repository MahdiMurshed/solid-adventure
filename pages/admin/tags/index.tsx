// import Heading from "@components/Headings";
import CustomLoader from "@components/CustomLoader";
import Heading from "@components/Headings";
import UserTable from "@components/tables/userTable";
import useTags from "@hooks/useTags";

const MaterialApprovePage = () => {
  const { tags, isLoading } = useTags();

  if (isLoading) {
    return (
      <div className="w-2/3 mx-auto">
        <CustomLoader />;
      </div>
    );
  }

  const noMaterials = tags.length === 0;
  return noMaterials ? (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Heading variant="h2">No new materials</Heading>
    </div>
  ) : (
    <UserTable users={tags} role="tags" />
  );
};

export default MaterialApprovePage;
