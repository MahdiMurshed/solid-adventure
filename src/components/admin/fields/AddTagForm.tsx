import CustomButton from "@components/CustomButton";
import { CustomTextInput } from "@components/CustomInput";
import useCategories from "@hooks/useCategories";
import useCurrentUser from "@hooks/useCurrentUser";
import { Box, Container, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import axios from "src/lib/axios";
import { transformer } from "src/lib/helpers";

interface IEditForm {
  handleCancel: React.DispatchWithoutAction;
  name?: string;
  id?: string;
  type?: string;
  categoryId?: string;
}

const AddTagForm = ({ name, handleCancel, id, categoryId }: IEditForm) => {

  const { user } = useCurrentUser();
  const form = useForm({
    initialValues: {
      name: name ?? "",
      category: categoryId ?? "",
    },

    validate: {
      name: (value) => {
        if (value === "") return "Name is required";
      },
    },
  });

  const { categories, isLoading } = useCategories();
  const queryClient = useQueryClient();
  const handleSave = async (values: any) => {
    if (id) {
      handleEdit(values);
      return;
    }
    const key = `/admin/tags`;

    try {
      await axios.post(key, {
        name: values.name,
        categoryId: values.category,
        userId: user.id,
      });

      toast.success("Tag added Successfully");
      queryClient.invalidateQueries(["tags"]);
    } catch (err) {
      console.log({ err });
      toast.error("Add failed");
    }
    handleCancel();
  };

  const handleEdit = async (values: any) => {
    const key = `/admin/tags`;

    try {
      await axios.put(key, {
        name: values.name,
        tagId: id,
        categoryId,
      });

      toast.success("Tag edited Successfully");
      queryClient.invalidateQueries(["tags"]);
    } catch (err) {
      console.log({ err });
      toast.error("Edit failed");
    }
    handleCancel();
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <Box>
      <Container>
        <form onSubmit={form.onSubmit(handleSave)}>
          <Select
            readOnly={!!id}
            placeholder="Category"
            data={transformer(categories)}
            label="Category"
            {...form.getInputProps("category")}
            radius="md"
          />
          <CustomTextInput label="Name" {...form.getInputProps("name")} />

          <div
            style={{
              paddingTop: "1rem",
            }}
          >
            <CustomButton type="submit">Save</CustomButton>
          </div>
        </form>
      </Container>
    </Box>
  );
};

export default React.memo(AddTagForm);
