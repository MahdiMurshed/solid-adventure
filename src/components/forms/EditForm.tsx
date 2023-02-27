import { CustomTextInput } from "@components/CustomInput";
import { ButtonGroup } from "@components/Modal";
import { useInvalidate } from "@hooks/useInvalidate";
import { Box, Container, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ROLES_ARRAY } from "pages/sign-up";
import React from "react";
import toast from "react-hot-toast";
import { ROLES } from "src/constants";
import axios from "src/lib/axios";
import { IEditInfo, IUser, TROLES } from "src/types";

interface IEditForm extends IUser {
  handleCancel: React.DispatchWithoutAction;
}

const EditForm = ({
  id,
  approved,
  email,
  name,
  reg,
  role,
  handleCancel,
}: IEditForm) => {
  const form = useForm({
    initialValues: {
      name: name ?? "",
      reg: reg ?? "",
      email: email ?? "",
      role: role ?? "",
      approved: approved ? "true" : "false",
    },

    validate: {},
  });
  const invalidate = useInvalidate();
  const handleSave = async (values: IEditInfo) => {
    const key = `/users/edit`;
    const toastId = toast.loading("Editing Profile");

    try {
      await axios.patch(`${key}/${id}`, {
        name: values.name,
        reg: values.reg,
        email: values.email,
        role: values.role,
        approved: values.approved,
      });

      toast.success("User Edited Successfully");
      invalidate(["users"]);
    } catch (err) {
      console.log({ err });
      toast.error("Edit failed");
    }
    handleCancel();

    toast.dismiss(toastId);
  };
  return (
    <Box>
      <Container>
        <CustomTextInput label="Name" {...form.getInputProps("name")} />
        {role === ROLES.STUDENT && (
          <CustomTextInput
            label="Registration No"
            {...form.getInputProps("reg")}
          />
        )}
        <CustomTextInput label="Email" {...form.getInputProps("email")} />

        <Select
          label="Role"
          mt={8}
          mb={10}
          value={form.values.role}
          onChange={(val: string | null) =>
            form.setFieldValue("role", val as unknown as TROLES)
          }
          data={ROLES_ARRAY}
          radius="md"
        />
        <Select
          label="Approval Status"
          mt={8}
          mb={10}
          value={form.values.approved}
          onChange={(val: string | null) =>
            form.setFieldValue("approved", val as string)
          }
          data={["true", "false"]}
          radius="md"
        />
        <div
          style={{
            paddingTop: "1rem",
          }}
        >
          <ButtonGroup
            handleConfirm={() => handleSave(form.values)}
            confirmLabel="Submit"
            handleCancel={handleCancel}
          />
        </div>
      </Container>
    </Box>
  );
};

export default React.memo(EditForm);
