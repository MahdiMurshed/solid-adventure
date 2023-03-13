import CustomButton from "@components/CustomButton";
import { useMaterialAdd, useValues } from "@hooks/store";
import useCategories from "@hooks/useCategories";
import { useStudents, useTeachers } from "@hooks/user";
import {
  LoadingOverlay,
  MultiSelect,
  Paper,
  Select, Textarea, TextInput
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconChevronDown } from "@tabler/icons";
import clsx from "clsx";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { transformer } from "src/lib/helpers";
import FileAdd from "./FileAdd";
import LinkAdd from "./LinkAdd";

export default function MaterialUpload() {
  const [loading, toggleLoading] = useReducer((state) => !state, false);
  const [values, setValues] = useValues();
  const handleMaterialAdd = useMaterialAdd();
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const { teachers, isLoading: teachersAreLoading } = useTeachers(true);
  const { students, isLoading: studentsAreLoading } = useStudents(true);
  const { categories, isLoading: categoriesLoading } = useCategories();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      toggleLoading();
      try {
        const response = await handleMaterialAdd();
        console.log({ response });
        toast.success("Added Successfully");
        toggleLoading();
        router.push(`/materials/${response.data.id}`);
      } catch (err) {
        console.log({ err });
        toast.error("Addition failed!");
        toggleLoading();
      }
    },
    [handleMaterialAdd, router]
  );

  useEffect(() => {
    if (!categories) return;
    setTags(
      transformer(
        categories?.find((cat) => cat.id === values.category)?.tags ?? []
      )
    );
  }, [values.category]);

  if (teachersAreLoading || studentsAreLoading || categoriesLoading)
    return <LoadingOverlay visible={true} />;

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        shadow="xl"
        radius="md"
        p="xl"
        className="flex flex-col gap-4 pb-10"
      >
        <TextInput
          value={values.title}
          placeholder="Title of the research material"
          label="Title"
          withAsterisk
          radius="md"
          size="md"
          onChange={(event) =>
            setValues({ value: event.currentTarget.value, type: "title" })
          }
          className=""
          required
        />
        <Textarea
          placeholder="Abstract"
          label="Abstract"
          radius="md"
          size="md"
          withAsterisk
          minRows={8}
          maxRows={16}
          value={values.abstract}
          onChange={(event) =>
            setValues({ value: event.currentTarget.value, type: "abstract" })
          }
          required
        />
        {/* <AuthorAdd /> */}
        <div className="flex items-center gap-4">
          <MultiSelect
            data={transformer(teachers)}
            value={values.supervisors}
            onChange={(value) => setValues({ value, type: "supervisors" })}
            searchable
            className="flex-1 "
            label="Supervisor(s)"
            radius="md"
            size="md"
            placeholder="Search for supervisor(s)"
            rightSection={<IconChevronDown size={14} />}
            styles={{ rightSection: { pointerEvents: "none" } }}
            rightSectionWidth={40}
            required
            // error={
            //   values.supervisors.length === 0 ? "required field" : undefined
            // }
          />
          <MultiSelect
            data={transformer(students)}
            value={values.authors}
            onChange={(value) => setValues({ value, type: "authors" })}
            searchable
            className="flex-1 "
            label="Author(s)"
            radius="md"
            size="md"
            placeholder="Search for author(s)"
            rightSection={<IconChevronDown size={14} />}
            styles={{ rightSection: { pointerEvents: "none" } }}
            rightSectionWidth={40}
            required
            // error={
            //   values.supervisors.length === 0 ? "required field" : undefined
            // }
          />
        </div>
        <div className="flex items-center gap-4">
          <Select
            data={transformer(categories)}
            value={values.category}
            onChange={(value) => setValues({ value, type: "category" })}
            searchable
            className="flex-1 "
            label="Research focus"
            radius="md"
            size="md"
            placeholder="Research focus"
            rightSection={<IconChevronDown size={14} />}
            styles={{ rightSection: { pointerEvents: "none" } }}
            rightSectionWidth={40}
            required
          />
          <MultiSelect
            data={transformer(tags)}
            value={values.tags}
            searchable
            onChange={(values) => setValues({ value: values, type: "tags" })}
            className="flex-1 "
            label="Tags"
            radius="md"
            size="md"
            placeholder="Enter tag(s)"
            rightSection={<IconChevronDown size={14} />}
            styles={{ rightSection: { pointerEvents: "none" } }}
            rightSectionWidth={40}
            // creatable
            // onCreate={(query) => {
            //   setTags((current) => [...current, query]);
            //   return query;
            // }}
          />
        </div>

        <FileAdd />
        <LinkAdd />
        <Select
          data={[
            { value: "IN_PROGRESS", label: "In progress" },
            { value: "FINISHED", label: "Finished" },
          ]}
          value={values.status}
          onChange={(value) => setValues({ value, type: "status" })}
          searchable
          className="flex-1"
          label="Status"
          radius="md"
          size="md"
          placeholder="Project status"
          rightSection={<IconChevronDown size={14} />}
          styles={{ rightSection: { pointerEvents: "none" } }}
          rightSectionWidth={40}
          required
        />
        <div className="flex items-center gap-10">
          <DatePicker
            value={values.dateStarted}
            onChange={(event) =>
              setValues({ value: event, type: "dateStarted" })
            }
            maxDate={new Date()}
            className={clsx(values.status === "FINISHED" ? "flex-1" : "w-1/2")}
            label="Date Started"
            radius="md"
            placeholder="pick a date"
            size="md"
          />
          {values.status === "FINISHED" && (
            <DatePicker
              value={values.dateFinished}
              onChange={(event) => {
                console.log({ event });
                setValues({ value: event, type: "dateFinished" });
              }}
              className="flex-1"
              placeholder="pick a date"
              label="Date Finished"
              size="md"
              minDate={dayjs(values.dateStarted).toDate()}
              radius="md"
            />
          )}
        </div>
        <CustomButton type="submit" className="mt-20" loading={loading}>
          Submit
        </CustomButton>
      </Paper>
    </form>
  );
}
