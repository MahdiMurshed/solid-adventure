import { useCallback, useReducer, useState } from "react";
import { toast } from "react-toastify";
import axios from "src/lib/axios";
import { useInvalidate } from "./useInvalidate";

export const useUserActions = ({ userIds }: { userIds: string[] }) => {
  const [opened, toggleOpened] = useReducer((state) => !state, false);
  const [isLoading, setLoading] = useState(false);
  const invalidate = useInvalidate();

  const handleUserAccept = useCallback(async () => {
    setLoading(true);
    try {
      const url = `/requests/accept`;
      await axios.patch(url, {
        userIds,
      });
      toast.success("User Accepted Successfully");
    } catch (err) {
      console.log({ err });
    }
    invalidate(["users"]);
    setLoading(false);
  }, [invalidate, userIds]);

  const handleUserDelete = useCallback(async () => {
    const toastId = toast.loading("Rejecting user request");
    try {
      const url = `/requests/reject`;
      await axios.patch(url, {
        userIds,
      });
      toast.success("User rejected Successfully");
    } catch (err) {
      console.log({ err });
      toast.error("Rejection failed!");
    }
    toast.dismiss(toastId);
    toggleOpened();
  }, [userIds]);

  return {
    opened,
    isLoading,
    toggleOpened,
    handleUserAccept,
    handleUserDelete,
  };
};
