import Heading from "@components/Headings";
import UserTable from "@components/tables/userTable";
import useCategories from "@hooks/useCategories";

const MaterialApprovePage = () => {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return null;
  }

  const noMaterials = categories.length === 0;
  return noMaterials ? (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Heading variant="h2">No new materials</Heading>
    </div>
  ) : (
    <UserTable users={categories} role="categories" />
  );
};

export default MaterialApprovePage;
