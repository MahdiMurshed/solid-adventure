import IconWrapper from "@components/IconWrapper";
import { ConfirmDeleteModal, MaterialShowModal } from "@components/Modal";
import useTopMaterialActions from "@hooks/admin/useTopMaterialActions";
import { useTopMaterials } from "@hooks/materials";
import usePathNameAttributes from "@hooks/usePathName";
import { Group } from "@mantine/core";
import { IconCheck, IconEye, IconStar, IconTrash } from "@tabler/icons";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useCallback, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "src/lib/axios";

export const Material_COLUMNS = [
  {
    Header: "Title",

    accessor: "title",
    disableFilters: true,
  },
  {
    Header: "Action",

    Cell: ({ row }) => <MemoizedActionOnMaterial material={row.original} />,
  },
  {
    Header: " ",
    Cell: ({ row }) => <Favorite id={row.original.id} />,
  },
];

const ActionOnMaterial = ({ material }) => {
  const [opened, toggleOpened] = useReducer((state) => !state, false);
  const [loading, toggleLoading] = useReducer((state) => !state, false);
  const queryClient = useQueryClient();
  const { isOnSpecificPage: isOnAdminMaterialPage } =
    usePathNameAttributes("/admin/materials");
  const [editModalOpened, toggleEditModalOpened] = useReducer(
    (state) => !state,
    false
  );

  // console.log(user);
  const handleMaterialAccept = useCallback(async () => {
    toggleLoading();
    const toastId = toast.loading("Rejecting user request");

    try {
      await axios.patch(`/requests/materials/accept`, {
        materialIds: [material.id],
      }),
        toast.success("User rejected Successfully");
      queryClient.invalidateQueries({ queryKey: ["materials", "nonApproved"] });
    } catch (err) {
      console.log({ err });
      toast.error("Rejection failed!");
    }
    toast.dismiss(toastId);
    toggleLoading();
  }, [material.id, queryClient]);

  const handleUserDelete = useCallback(async () => {
    const toastId = toast.loading("Rejecting user request");

    try {
      const url = `/requests/materials/reject`;
      await axios.patch(url, {
        materialIds: [material.id],
      });
      toast.success("User rejected Successfully");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    } catch (err) {
      console.log({ err });
      toast.error("Rejection failed!");
    }
    toast.dismiss(toastId);
    toggleOpened();
  }, [material.id, queryClient]);
  return (
    <>
      <Group spacing={0}>
        {!isOnAdminMaterialPage && (
          <IconWrapper label="Accept" color="#51cf66">
            <IconCheck
              size={16}
              stroke={1.5}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                color: "#69db7c",
              }}
              onClick={loading ? null : handleMaterialAccept}
            />
          </IconWrapper>
        )}
        <IconWrapper label="Delete" color="red">
          <IconTrash
            size={16}
            stroke={1.5}
            style={{
              cursor: "pointer",
              color: "#ffa8a8",
            }}
            onClick={toggleOpened}
          />
        </IconWrapper>
        <IconWrapper label="Preview" color="yellow">
          <IconEye
            size={16}
            stroke={1.5}
            style={{
              cursor: "pointer",
              color: "#69db7c",
            }}
            onClick={toggleEditModalOpened}
          />
        </IconWrapper>
      </Group>
      <MaterialShowModal
        title=""
        description=""
        opened={editModalOpened}
        handleCancel={toggleEditModalOpened}
        materialId={material.id}
      />
      <ConfirmDeleteModal
        title="Reject request"
        description="Are you sure you want to reject the material. This task is irreversible."
        opened={opened}
        handleCancel={toggleOpened}
        handleConfirm={handleUserDelete}
      />
    </>
  );
};

const MemoizedActionOnMaterial = memo(ActionOnMaterial);

const Favorite = ({ id }) => {
  const { materials, isLoading } = useTopMaterials();
  const { isOnSpecificPage: isOnAdminMaterialPage } =
    usePathNameAttributes("/admin/materials");

  const { handleRemoveFromTheToTop, handleAddToTop } = useTopMaterialActions({
    materialIds: [id],
  });

  if (isLoading) return null;
  const isInTheTop = materials.findIndex((m) => m.id === id) !== -1;
  if (!isOnAdminMaterialPage) return null;

  return !isInTheTop ? (
    <IconWrapper label="Add to the top" color="teal">
      <IconStar size={20} stroke={2} onClick={handleAddToTop} />
    </IconWrapper>
  ) : (
    <IconWrapper label="Remove from the top" color="red">
      <IconStar
        fill="red"
        size={20}
        stroke={1.5}
        color="red"
        onClick={handleRemoveFromTheToTop}
      />
    </IconWrapper>
  );
};
