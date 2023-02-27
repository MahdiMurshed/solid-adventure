/* eslint-disable react/display-name */
import useCurrentUser from "@hooks/useCurrentUser";
import { useRouter } from "next/router";
import { ROLES } from "src/constants";

export default function withAuth(Component: any) {
  return (props: any) => {
    const router = useRouter();
    const { user, isLoading } = useCurrentUser();
    if (typeof window !== "undefined") {
      if (isLoading) {
        return null;
      }
      if (user && user.role === ROLES.ADMIN) {
        return <Component {...props} />;
      }
      router.replace("/");
      return null;
    }
    return null;
  };
}
