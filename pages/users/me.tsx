import CustomLoader from "@components/CustomLoader";
import UserLayout from "@components/layout/UserLayout";
import NoticeByUser from "@components/notices/NoticeByUser";
import NoticeForm from "@components/notices/NoticeForm";
import AccountEdit from "@components/users/AccountSetting";
import MaterialApprovePage from "@components/users/MaterialApprovePage";
import MaterialsOfSpecificUser from "@components/users/MaterialsOfSpecificUser";
import { useActivePage } from "@hooks/uistate";
import useCurrentUser from "@hooks/useCurrentUser";

const Pages = {
  Account: <AccountEdit />,
  Materials: <MaterialsOfSpecificUser />,
  "New Materials": <MaterialApprovePage />,
  "Publish a Notice": <NoticeForm />,
  Notices: <NoticeByUser />,
};

const User = () => {
  const { user, status } = useCurrentUser();
  const [activePage] = useActivePage();
  const { isLoading } = useCurrentUser();

  if (status !== "unauthenticated" && isLoading) return <CustomLoader />;
  if (user) {
    return <UserLayout>{Pages[activePage]}</UserLayout>;
  }
};

export default User;
