import { useFiles } from "@hooks/store";
import { ActionIcon, FileInput, TextInput, Tooltip } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";
import { memo } from "react";

export interface IFile {
  label: string;
  file: File | null;
}

const LinkAdd = () => {
  const fileState = {
    label: "",
    file: null,
  };
  const [files, setFiles] = useFiles();

  console.log({ files });

  type FileState =
    | {
        index: number;
        value: string;
      }
    | {
        index: number;
        value: File;
      };

  const handleFileAdd = ({ index, value }: FileState) => {
    const newFiles = files?.slice();
    if (typeof value === "string") {
      value = value.trim();
      newFiles[index]["label"] = value;
    } else if (value instanceof File) {
      newFiles[index]["file"] = value;
    }
    setFiles(newFiles);
  };

  const handleFileStateAdd = () => {
    const newFiles = [...files, fileState];

    setFiles(newFiles);
  };
  const handleFileRemove = (index: number) => {
    if (index === 0) {
      setFiles([fileState]);
      return;
    } else {
      const newFiles = files?.slice();
      newFiles?.splice(index, 1);
      setFiles(newFiles);
    }
  };
  return (
    <>
      {" "}
      <h1 className="header-3">Files</h1>
      {files?.map((file, i) => (
        <div className="flex items-center w-full gap-2" key={i}>
          <TextInput
            value={file.label}
            placeholder="label"
            //   label="Authors(comma separated))"
            withAsterisk
            radius="md"
            size="md"
            // onChange={(event) => setValue(event.currentTarget.value)}
            onChange={(event) =>
              handleFileAdd({
                index: i,
                value: event.currentTarget.value,
              })
            }
            className=""
          />
          <FileInput
            radius="md"
            size="md"
            value={file.file}
            onChange={(file: File) => handleFileAdd({ index: i, value: file })}
            className="flex-1"
            placeholder="Upload file"
            disabled={file.label === ""}
          />

          <Tooltip label="Add more files" color="blue" position="right">
            <ActionIcon
              onClick={handleFileStateAdd}
              disabled={file.label === "" || file.file === new File([""], "")}
            >
              <IconPlus size={24} />
            </ActionIcon>
          </Tooltip>
          {file.label !== "" && file.file !== null && (
            <Tooltip label="remove" color="red" position="right">
              <ActionIcon onClick={() => handleFileRemove(i)}>
                <IconMinus size={24} />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
      ))}
    </>
  );
};

export default memo(LinkAdd);
