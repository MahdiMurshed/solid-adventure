import CustomButton from "@components/CustomButton";
import useCurrentUser from "@hooks/useCurrentUser";
import { useInvalidate } from "@hooks/useInvalidate";
import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useReducer } from "react";
import { toast } from "react-toastify";
import axios from "src/lib/axios";

interface IForm {
  title: string;
  body: string;
}

type IProps = Partial<IForm> & {
  id?: string;
  handleCancel?: () => void;
};
const NoticeForm = ({ title, body, id, handleCancel }: IProps) => {
  const { user }=useCurrentUser()
  const form = useForm<IForm>({
    initialValues: {
      title: title ?? "",
      body: body ?? "",
    },
    validate: {
      title: (value) => {
        if (!value) {
          return "Title is required";
        }
      },
      body: (value) => {
        if (!value) {
          return "Description is required";
        }
      },
    },
  });

  const [loading, toggleLoading] = useReducer((s) => !s, false);
  const invalidate = useInvalidate();

  const handlePost = async (values: IForm) => {
    console.log(values);
    toggleLoading();
    if (id) {
      try {
        const response = await axios.patch("/notice", { ...values, id });
        console.log(response);
        toast.success("Edited Successfully");
      } catch (e) {
        console.log(e);
      }

      invalidate(["notices"]);
      if (handleCancel) handleCancel();
      return;
    }

    try {
      const response = await axios.post("/notice", {
        ...values,
        userId:user?.id
      });
      console.log(response);
      toast.success("Added Successfully");
    } catch (e) {
      console.log(e);
    }
    invalidate(["notices"]);

    toggleLoading();
  };
  return (
    <div className="w-2/3 shadow-sm mx-auto p-4 m-2">
      <form onSubmit={form.onSubmit(handlePost)}>
        <h3 className="text-xl font-bold text-center py-2">
          {id ? "Update Post" : "Create a Post"}
        </h3>
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="Title"
            autosize
            minRows={1}
            label="Title"
            {...form.getInputProps("title")}
          />
          <Textarea
            placeholder="Write something..."
            autosize
            minRows={6}
            label="Description"
            {...form.getInputProps("body")}
          />

          <Group>
            <CustomButton size="sm" type="submit" loading={loading}>
              {id ? "Update" : "Post"}
            </CustomButton>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </Group>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
