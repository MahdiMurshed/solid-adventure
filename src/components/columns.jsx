import IconWrapper from "@components/IconWrapper";
import { ConfirmDeleteModal, CustomModal } from "@components/Modal";
import { Badge, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useCallback, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "src/lib/axios";
import AddCategoryForm from "./admin/fields/AddCategoryForm";
import AddTagForm from "./admin/fields/AddTagForm";
export const CATEGORY_COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    disableFilters: true,
    Cell: ({ row }) => (
      <Badge size="lg" variant="outline">
        {row.original.name}
      </Badge>
    ),
  },
  {
    Header: "Added by",
    Cell: ({ row }) => <Badge>{row.original.addedByUser.name}</Badge>,
  },
  {
    Header: "Action",

    Cell: ({ row }) => <MemoizedActionOnMaterial material={row.original} />,
  },
];

export const TAG_COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => (
      <Badge size="lg" variant="outline">
        {row.original.name}
      </Badge>
    ),

    disableFilters: true,
  },
  {
    Header: "Category",
    Cell: ({ row }) => (
      <Badge
        variant="gradient"
        gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
      >
        {row.original.category.name}
      </Badge>
    ),
  },
  {
    Header: "Action",

    Cell: ({ row }) => (
      <MemoizedActionOnMaterialOfTag material={row.original} />
    ),
  },
];

const ActionOnMaterial = ({ material }) => {
  const [opened, toggleOpened] = useReducer((state) => !state, false);
  const queryClient = useQueryClient();

  const [editModalOpened, toggleEditModalOpened] = useReducer(
    (state) => !state,
    false
  );

  const handleUserDelete = useCallback(async () => {
    try {
      const url = `/admin/categories`;
      await axios.patch(url, {
        categoryIds: [material.id],
      });
      toast.success("Category deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (err) {
      console.log({ err });
      toast.error("Deletion failed!");
    }

    toggleOpened();
  }, [material.id, queryClient]);
  return (
    <>
      <Group spacing={0}>
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
        <IconWrapper label="Edit" color="yellow">
          <IconPencil
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
      <ConfirmDeleteModal
        title="Reject request"
        description="Are you sure you want to reject the material. This task is irreversible."
        opened={opened}
        handleCancel={toggleOpened}
        handleConfirm={handleUserDelete}
      />

      <CustomModal
        opened={editModalOpened}
        handleCancel={toggleEditModalOpened}
        title={`Edit Category`}
      >
        <AddCategoryForm
          handleCancel={toggleEditModalOpened}
          name={material.name}
          id={material.id}
        />
      </CustomModal>
    </>
  );
};

const MemoizedActionOnMaterial = memo(ActionOnMaterial);

const ActionOnMaterialOfTag = ({ material }) => {
  const [opened, toggleOpened] = useReducer((state) => !state, false);
  const queryClient = useQueryClient();

  const [editModalOpened, toggleEditModalOpened] = useReducer(
    (state) => !state,
    false
  );

  const handleUserDelete = useCallback(async () => {
    try {
      const url = `/admin/tags`;
      await axios.patch(url, {
        tagIds: [material.id],
      });
      toast.success("tag deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    } catch (err) {
      console.log({ err });
      toast.error("Deletion failed!");
    }

    toggleOpened();
  }, [material.id, queryClient]);
  return (
    <>
      <Group spacing={0}>
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
        <IconWrapper label="Edit" color="yellow">
          <IconPencil
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
      <ConfirmDeleteModal
        title="Reject request"
        description="Are you sure you want to reject the material. This task is irreversible."
        opened={opened}
        handleCancel={toggleOpened}
        handleConfirm={handleUserDelete}
      />
      <CustomModal
        opened={editModalOpened}
        handleCancel={toggleEditModalOpened}
        title={`Edit Category`}
      >
        <AddTagForm
          handleCancel={toggleEditModalOpened}
          name={material.name}
          id={material.id}
          categoryId={material.categoryId}
        />
      </CustomModal>
    </>
  );
};

const MemoizedActionOnMaterialOfTag = memo(ActionOnMaterialOfTag);
