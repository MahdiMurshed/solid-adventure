import CustomButton from "@components/CustomButton";
import Links from "@components/materials/MaterialAdd/Links";
import useCurrentUser from "@hooks/useCurrentUser";
import { useInvalidate } from "@hooks/useInvalidate";
import useTags from "@hooks/useTags";
import {
  Group,
  MultiSelect,
  SimpleGrid,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons";
import { useReducer } from "react";
import { toast } from "react-toastify";
import axios from "src/lib/axios";
import { transformer } from "src/lib/helpers";
import { ILink, IUserFormValues } from "src/types";

export function AccountForm() {
  const { user } = useCurrentUser();
  const [isEditing, toggleEditing] = useReducer((state) => !state, false);
  const invalidate = useInvalidate();
  const form = useForm<IUserFormValues>({
    initialValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? "",
      secondaryEmail: user?.secondaryEmail ?? "",
      contactNumber: user?.contactNumber ?? "",
      researchInterestIds: user?.researchInterestIds ?? [],
      links:
        (user?.links as unknown as ILink[]) ??
        ([
          {
            label: "",
            url: "",
          },
        ] as unknown as ILink[]),
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      secondaryEmail: (value) => {
        if (value === "") return null;
        return !/^\S+@\S+$/.test(value);
      },
    },
  });

  const { tags, isLoading: tagsLoading } = useTags();

  const handleSubmit = async (values: IUserFormValues) => {
    try {
      await axios.patch(`/users/${user.id}`, values);
      toast.success("Successful submit!");
      invalidate(["me"]);
    } catch (err) {
      console.log({ err });
    }
    toggleEditing();
  };
  if (tagsLoading) return null;

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <h1 className="header-3 border-b-[1px]">Basic information</h1>
      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <TextInput
          label="Name"
          placeholder="Your name"
          name="name"
          {...form.getInputProps("name")}
          readOnly={!isEditing}
        />
        <TextInput
          label="Email"
          placeholder="Your email"
          name="email"
          {...form.getInputProps("email")}
          readOnly
        />
      </SimpleGrid>

      <Textarea
        mt="md"
        label="Bio"
        placeholder="Your bio"
        maxRows={10}
        minRows={5}
        autosize
        name="message"
        {...form.getInputProps("bio")}
        readOnly={!isEditing}
      />
      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <TextInput
          label="Contact number"
          placeholder="Your contact number"
          name="name"
          {...form.getInputProps("contactNumber")}
          readOnly={!isEditing}
        />
        <TextInput
          label="Secondary email"
          placeholder="Your secondary email"
          name="email"
          {...form.getInputProps("secondaryEmail")}
          readOnly={!isEditing}
        />
      </SimpleGrid>
      <MultiSelect
        readOnly={!isEditing}
        data={transformer(tags)}
        label="Research Interest"
        searchable
        className="flex-1 "
        {...form.getInputProps("researchInterestIds")}
        radius="md"
        size="md"
        placeholder="Select research interests"
        rightSection={<IconChevronDown size={14} />}
        styles={{ rightSection: { pointerEvents: "none" } }}
        rightSectionWidth={40}
        required
      />
      <Links
        readOnly={!isEditing}
        title="Social Links"
        links={form.values.links}
        setLinks={(links) => form.setFieldValue("links", links)}
      />

      {!isEditing && (
        <Group mt="xl">
          <CustomButton size="md" onClick={toggleEditing}>
            Update Information
          </CustomButton>
        </Group>
      )}
      {isEditing && (
        <Group mt="xl" position="right">
          <CustomButton type="submit" size="md">
            Save
          </CustomButton>
        </Group>
      )}
    </form>
  );
}
