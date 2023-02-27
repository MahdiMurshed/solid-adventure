import withAuth from "@components/withAuth";
import { PropsWithChildren } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="h-screen w-full overflow-auto">{children}</div>
    </div>
  );
};

export default withAuth(AdminLayout);
