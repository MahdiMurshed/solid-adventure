import { NavbarSimple } from "@components/users/Sidebar";
import { FC, ReactNode } from "react";

const UserLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <NavbarSimple />
      {children}
    </div>
  );
};

export default UserLayout;
