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

interface IEditForm {
  handleCancel: React.DispatchWithoutAction;
  name?: string;
  id?: string;
  type?: string;
}

const AddCategoryForm = ({
  name,
  handleCancel,
  id,
  type = "categories",
}: IEditForm) => {
  const form = useForm({
    initialValues: {
      name: name ?? "",
      category: "",
    },

    validate: {
      name: (value) => {
        if (value === "") return "Name is required";
      },
    },
  });
  const { user } = useCurrentUser();

  const transformer = (data: any) =>
    data.map((data: any) => ({
      ...data,
      label: data.name,
      value: data.id,
    }));
  const { categories, isLoading } = useCategories();
  const queryClient = useQueryClient();
  const handleSave = async (values: any) => {
    if (id) {
      handleEdit(values);
      return;
    }
    const key = `/admin/categories`;

    try {
      await axios.post(key, {
        name: values.name,
        userId:user.id
      });

      toast.success("Category added Successfully");
      queryClient.invalidateQueries(["categories"]);
    } catch (err) {
      console.log({ err });
      toast.error("Add failed");
    }
    handleCancel();
  };

  const handleEdit = async (values: any) => {
    const key = `/admin/categories`;

    try {
      await axios.put(key, {
        name: values.name,
        categoryId: id,
      });

      toast.success("Category added Successfully");
      queryClient.invalidateQueries(["categories"]);
    } catch (err) {
      console.log({ err });
      toast.error("Add failed");
    }
    handleCancel();
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <Box>
      <Container>
        <form onSubmit={form.onSubmit(handleSave)}>
          <CustomTextInput label="Name" {...form.getInputProps("name")} />

          {type === "tag" && (
            <Select
              data={transformer(categories)}
              label="Category"
              {...form.getInputProps("category")}
              radius="md"
            />
          )}
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

export default React.memo(AddCategoryForm);
