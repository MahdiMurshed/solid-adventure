import CustomLoader from "@components/CustomLoader";
import NotFound from "@components/ErrorPage";
import UserLayout from "@components/layout/UserLayout";
import NoticeByUser from "@components/notices/NoticeByUser";
import NoticeForm from "@components/notices/NoticeForm";
import AccountEdit from "@components/users/AccountSetting";
import MaterialApprovePage from "@components/users/MaterialApprovePage";
import MaterialsOfSpecificUser from "@components/users/MaterialsOfSpecificUser";
import { useActivePage } from "@hooks/uistate";
import useCurrentUser from "@hooks/useCurrentUser";
import { useSession } from "next-auth/react";

const Pages = {
  Account: <AccountEdit />,
  Materials: <MaterialsOfSpecificUser />,
  "New Materials": <MaterialApprovePage />,
  "Publish a Notice": <NoticeForm />,
  Notices: <NoticeByUser />,
};

const User = () => {
  const { data, status } = useSession();
  const [activePage] = useActivePage();
  const { isLoading } = useCurrentUser();

  if (status !== "unauthenticated" && isLoading) return <CustomLoader />;
  if (data) {
    return <UserLayout>{Pages[activePage]}</UserLayout>;
  }
  return <NotFound />;
};

export default User;
