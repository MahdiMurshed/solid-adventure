import Heading from "@components/Headings";
import UserTable from "@components/tables/userTable";
import { useNonApprovedMaterials } from "@hooks/materials";

const MaterialApprovePage = () => {
  const { materials, isLoading } = useNonApprovedMaterials();

  if (isLoading) {
    return null;
  }
  const noNewMaterials = materials.length === 0;
  return noNewMaterials ? (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Heading variant="h2">No new materials</Heading>
    </div>
  ) : (
    <UserTable users={materials} role="materials" />
  );
};

export default MaterialApprovePage;
