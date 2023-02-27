import CustomLoader from "@components/CustomLoader";
import Heading from "@components/Headings";
import Layout from "@components/layout";
import MaterialCard from "@components/materials/MaterialCard";
import { useMaterialOfSpecificCategory } from "@hooks/materialOfSpecificCategory";
import { useRouter } from "next/router";

const MaterialsWithSpecificCategory = () => {
  const router = useRouter();
  const { categoryName } = router.query as { categoryName: string };
  const { materials, isLoading } = useMaterialOfSpecificCategory({
    categoryId: categoryName,
  });
  const categoryLabel = materials[0]?.categories[0]?.name;

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <Layout>
      <div className="w-2/3 mx-auto pt-10">
        <Heading variant="h1" className="mb-4">
          Materials related to {categoryLabel}
        </Heading>

        <div className="flex flex-wrap gap-6 ">
          {materials.map((material) => (
            <MaterialCard key={material.id} materialId={material.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MaterialsWithSpecificCategory;
