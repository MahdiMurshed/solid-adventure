import { TaskCard } from "@components/admin/materials/MaterialCardAdmin";
import { useTopMaterials } from "@hooks/materials";

const TopResearch = () => {
  const { isLoading, materials } = useTopMaterials();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-6">
      <h2 className="text-4xl font-bold">Top Materials</h2>
      <p className="py-4 w-2/3">
        {materials.map((material) => (
          <TaskCard key={material.id} material={material} />
        ))}
      </p>
    </div>
  );
};

export default TopResearch;
