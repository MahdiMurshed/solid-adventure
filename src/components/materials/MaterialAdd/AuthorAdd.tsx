import { useAuthors } from "@hooks/store";
import { ActionIcon, TextInput, Tooltip } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";
import { memo } from "react";

const authorState = {
  name: "",
  socialLink: "",
};

export interface IAuthor {
  name: string;
  socialLink: string;
}

const AuthorAdd = () => {
  const [authors, setAuthors] = useAuthors();

  type AuthorState =
    | {
        index: number;
        value: string;
        type: "name";
      }
    | {
        index: number;
        value: string;
        type: "socialLink";
      };

  const handleLinkAdd = ({ index, value, type }: AuthorState) => {
    const newAuthors = authors?.slice();
    newAuthors[index][type] = value;
    setAuthors(newAuthors);
  };

  const handleLinkStateAdd = () => {
    const newAuthors = [...authors, authorState];

    setAuthors(newAuthors);
  };
  const handleLinkRemove = (index: number) => {
    if (index === 0) {
      setAuthors([authorState]);
      return;
    } else {
      const newAuthors = authors?.slice();
      newAuthors?.splice(index, 1);
      setAuthors(newAuthors);
    }
  };
  return (
    <>
      {" "}
      <h1 className="header-3">Authors</h1>
      {authors?.map((link, i) => (
        <div className="flex items-center w-full gap-2" key={i}>
          <TextInput
            value={link.name}
            placeholder="Author name"
            //   label="Authors(comma separated))"
            withAsterisk
            radius="md"
            size="md"
            type="text"
            // onChange={(event) => setValue(event.currentTarget.value)}
            onChange={(event) =>
              handleLinkAdd({
                index: i,
                value: event.currentTarget.value,
                type: "name",
              })
            }
            className=""
          />
          <TextInput
            value={link.socialLink}
            placeholder="Author's social link"
            //   label="Authors(comma separated))"
            withAsterisk
            radius="md"
            size="md"
            type="url"
            // onChange={(event) => setValue(event.currentTarget.value)}
            onChange={(event) =>
              handleLinkAdd({
                index: i,
                value: event.currentTarget.value,
                type: "socialLink",
              })
            }
            className="flex-1"
          />

          <Tooltip label="Add more files" color="blue" position="right">
            <ActionIcon
              onClick={handleLinkStateAdd}
              disabled={link.name === "" || link.socialLink === ""}
            >
              <IconPlus size={24} />
            </ActionIcon>
          </Tooltip>
          {link.name !== "" && link.socialLink !== "" && (
            <Tooltip label="remove" color="red" position="right">
              <ActionIcon onClick={() => handleLinkRemove(i)}>
                <IconMinus size={24} />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
      ))}
    </>
  );
};

export default memo(AuthorAdd);
