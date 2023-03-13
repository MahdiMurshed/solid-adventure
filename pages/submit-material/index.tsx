import CustomLoader from "@components/CustomLoader";
import Layout from "@components/layout";
import MaterialUpload from "@components/materials/MaterialAdd/MaterialUpload";
import useCurrentUser from "@hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SubmitMaterial = () => {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user?.approved) {
      router.push("/");
    }
  }, [isLoading, router, user?.approved]);
  if (isLoading || !user?.approved) return <CustomLoader/>;
  return (
    <Layout>
      <div className=" bg-primary-bg min-h-screen pt-10">
        <div className="mx-auto w-2/3">
          <h1 className="header-1 pb-4 text-center">Submit Material</h1>
          <MaterialUpload />
        </div>
      </div>
    </Layout>
  );
};

export default SubmitMaterial;
