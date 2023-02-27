import { useMaterialOfSpecificQuery } from "@hooks/useSearch";
import MaterialCard from "./MaterialCard";

const SearchResults = ({ searchQuery }: { searchQuery: string }) => {
  const { materials, isLoading } = useMaterialOfSpecificQuery({ searchQuery });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-8 w-full">
      <div className="flex flex-wrap gap-6 p-6">
        {materials.map((material) => (
          <MaterialCard key={material.id} materialId={material.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
