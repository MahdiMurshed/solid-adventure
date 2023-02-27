import CustomLoader from "@components/CustomLoader";
import Heading from "@components/Headings";
import UserTable from "@components/tables/userTable";
import withAuth from "@components/withAuth";
import { useApprovedMaterials } from "@hooks/materials";

const MaterialApprovePage = () => {
  const { materials, isLoading } = useApprovedMaterials();

  if (isLoading) {
    return <CustomLoader />;
  }
  const noMaterials = materials.length === 0;
  return noMaterials ? (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Heading variant="h2">No new materials</Heading>
    </div>
  ) : (
    <UserTable users={materials} role="materials" />
  );
};

export default withAuth(MaterialApprovePage);
