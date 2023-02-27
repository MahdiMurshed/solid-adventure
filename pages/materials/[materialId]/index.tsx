import Layout from "@components/layout";
import SingleMaterial from "@components/materials/SingleMaterial";
import { useRouter } from "next/router";

const Material = () => {
  const router = useRouter();
  const { materialId } = router.query as { materialId: string };
  return (
    <Layout>
      <SingleMaterial materialId={materialId} />
    </Layout>
  );
};

export default Material;
