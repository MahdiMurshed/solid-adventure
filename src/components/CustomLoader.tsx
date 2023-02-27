import { Loader } from "@mantine/core";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader variant="bars" />
    </div>
  );
};
export default CustomLoader;
