import { ActionIcon, TextInput, Tooltip } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";
import { ILink } from "src/types";
import { LinkState } from "./LinkAdd";

interface IProps {
  links: ILink[];
  // eslint-disable-next-line no-unused-vars
  setLinks: (links: ILink[]) => void;
  readOnly?: boolean;
  title?: string;
}

const Links = ({
  links,
  setLinks,
  readOnly = false,
  title = "Links",
}: IProps) => {
  const linkState = {
    label: "",
    url: "",
  };
  const handleLinkAdd = ({ index, value, type }: LinkState) => {
    const newLinks = links?.slice();
    newLinks[index][type] = value;
    setLinks(newLinks);
  };
  const handleLinkStateAdd = () => {
    const newLinks = [...links, linkState];

    setLinks(newLinks);
  };
  const handleLinkRemove = (index: number) => {
    if (index === 0) {
      setLinks([linkState]);
      return;
    } else {
      const newLinks = links?.slice();
      newLinks?.splice(index, 1);
      setLinks(newLinks);
    }
  };
  return (
    <div>
      <h1 className="header-3 pt-6 ">{title}</h1>
      {links?.map((link, i) => (
        <div className="flex items-center w-full gap-2 pt-4" key={i}>
          <TextInput
            value={link.label}
            placeholder="label"
            //   label="Authors(comma separated))"
            readOnly={readOnly}
            withAsterisk
            radius="md"
            size="md"
            type="text"
            // onChange={(event) => setValue(event.currentTarget.value)}
            onChange={(event) =>
              handleLinkAdd({
                index: i,
                value: event.currentTarget.value,
                type: "label",
              })
            }
          />
          <TextInput
            value={link.url}
            placeholder="enter url"
            //   label="Authors(comma separated))"
            withAsterisk
            radius="md"
            size="md"
            type="url"
            readOnly={readOnly}
            // onChange={(event) => setValue(event.currentTarget.value)}
            onChange={(event) =>
              handleLinkAdd({
                index: i,
                value: event.currentTarget.value,
                type: "url",
              })
            }
            className="flex-1"
          />

          <Tooltip label="Add more files" color="blue" position="right">
            <ActionIcon
              onClick={handleLinkStateAdd}
              disabled={link.label === "" || link.url === "" || readOnly}
            >
              <IconPlus size={24} />
            </ActionIcon>
          </Tooltip>
          {readOnly ||
            (link.label !== "" && link.url !== "" && (
              <Tooltip label="remove" color="red" position="right">
                <ActionIcon onClick={() => handleLinkRemove(i)}>
                  <IconMinus size={24} />
                </ActionIcon>
              </Tooltip>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Links;
