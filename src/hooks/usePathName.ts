import { useRouter } from "next/router";

const usePathNameAttributes = (name?: string) => {
  const router = useRouter();

  const pathname = router.pathname;
  return {
    pathname,
    isOnSpecificPage: name && pathname.includes(name),
  };
};
export default usePathNameAttributes;
