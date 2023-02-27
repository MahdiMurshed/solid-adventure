import Heading from "@components/Headings";
import MaterialCard from "@components/materials/MaterialCard";
import useCurrentUser from "@hooks/useCurrentUser";
import { useMaterialOfSpecificUser } from "@hooks/useMaterialsOfSpecificUser";
import { ROLES } from "src/constants";

const MaterialsOfSpecificUser = () => {
  const { user, isLoading } = useCurrentUser();
  const userId = user?.id as string;

  const {
    authorMaterials,
    supervisorMaterials,
    isLoading: materialsLoading,
    hasMaterials,
  } = useMaterialOfSpecificUser({ userId, role: user?.role as string });

  if (isLoading || materialsLoading) return <div>Loading...</div>;

  console.log({ hasMaterials });

  if (!hasMaterials)
    return (
      <h1 className="header-1 mx-auto pt-20 text-slate-500">
        No materials found
      </h1>
    );

  const userRole = user.role;
  return (
    <div className="p-4 ">
      {userRole === ROLES.TEACHER && supervisorMaterials.length > 0 && (
        <>
          <Heading variant="h2">All materials</Heading>
          <Heading variant="h4">Supervised</Heading>
          <div className="flex gap-4 flex-wrap pt-4">
            {supervisorMaterials.map((material) => (
              <MaterialCard key={material.id} materialId={material.id} />
            ))}
          </div>
        </>
      )}
      {authorMaterials.length > 0 && (
        <>
          <Heading variant="h2">All materials</Heading>

          <Heading variant="h4">Authored</Heading>
          <div className="flex gap-4 flex-wrap">
            {authorMaterials.map((material) => (
              <MaterialCard key={material.id} materialId={material.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialsOfSpecificUser;
