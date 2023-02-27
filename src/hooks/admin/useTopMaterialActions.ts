import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "src/lib/axios";

const useTopMaterialActions = ({ materialIds }: { materialIds: string[] }) => {
  const queryClient = useQueryClient();
  const [loading, toggleLoading] = useReducer((loading) => !loading, false);

  const handleRemoveFromTheToTop = useCallback(async () => {
    if (loading) return;
    const toastId = toast.loading("Removing from the top");
    toggleLoading();

    try {
      const url = `/materials/top-materials`;
      await axios.patch(url, {
        materialIds,
      });
      toast.success("Removed Successfully");
      queryClient.invalidateQueries({ queryKey: ["materials", "top"] });
      queryClient.invalidateQueries({ queryKey: ["materials", "approved"] });
    } catch (err) {
      console.log({ err });
      toast.error("Remove failed!");
    }
    toggleLoading();
    toast.dismiss(toastId);
  }, [loading, materialIds, queryClient]);
  const handleAddToTop = useCallback(async () => {
    if (loading) return;
    const toastId = toast.loading("Adding to top...");
    toggleLoading();
    try {
      const url = `/materials/top-materials`;
      await axios.post(url, {
        materialIds,
      });
      queryClient.invalidateQueries({ queryKey: ["materials", "top"] });
      queryClient.invalidateQueries({ queryKey: ["materials", "approved"] });
      toast.success("Added Successfully");
    } catch (err) {
      console.log({ err });
      toast.error("Add failed!");
    }
    toggleLoading();
    toast.dismiss(toastId);
  }, [loading, materialIds, queryClient]);
  return {
    handleRemoveFromTheToTop,
    handleAddToTop,
  };
};

export default useTopMaterialActions;
