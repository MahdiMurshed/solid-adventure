import CustomButton from "@components/CustomButton";
import useStyles from "@components/forms/styles";

import { Box, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconNumber, IconSelect } from "@tabler/icons";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "src/lib/axios";

export const ROLES_ARRAY = ["teacher", "student", "admin"];

interface IValues {
  role: string;
  regNo: string;
}

function NewUserForm() {
  const { classes } = useStyles();
  const { data: session } = useSession();
  const router = useRouter();

  console.log({ session });

  const form = useForm({
    initialValues: {
      role: "",
      regNo: "",
    },

    validate: {
      role: (value) => (ROLES_ARRAY.includes(value) ? null : "Invalid role"),
    },
  });

  const handleSubmit = async (values: IValues) => {
    const UserInfo = {
      email: session?.user?.email,
      role: values.role,
      reg: values.regNo,
    };

    try {
      await axios.patch(`/users`, UserInfo);
      toast.success("Successfull submit!");
      router.push("/");
    } catch (err) {
      console.log({ err });
      toast.error("you have already submit a response");
    }
  };

  return (
    <div className={classes.container}>
      <Box
        className={classes.signInBox}

        // className="border-8 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <p className={classes.title}>Sign Up</p>
          <p className={classes.description}>Fill up additional information</p>

          <Select
            icon={<IconSelect size={24} />}
            placeholder="role"
            className={classes.textInputWrapper}
            withAsterisk
            label="Select Role"
            value={form.values["role"]}
            onChange={(val) => form.setFieldValue("role", val as string)}
            data={ROLES_ARRAY}
          />

          {form.values["role"] === "student" && (
            <TextInput
              icon={<IconNumber size={24} />}
              className={classes.textInputWrapper}
              withAsterisk
              label="Registration no"
              placeholder="201..."
              {...form.getInputProps("regNo")}
            />
          )}

          <Group position="right" className="pt-10">
            <CustomButton type="submit" radius="lg">
              Submit
            </CustomButton>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default NewUserForm;
