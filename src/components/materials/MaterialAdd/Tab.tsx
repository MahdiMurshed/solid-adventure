import useCurrentUser from "@hooks/useCurrentUser";
import { Button, Modal, Tabs } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconPlus } from "@tabler/icons";
import { useReducer } from "react";
import { IMaterial } from "src/types";
import MarkdownViewer from "./MarkdownEditor";
import MaterialDescription from "./MaterialDescription";
import LiveMarkdown from "./markdown-editor";

const helperText =
  "Thank you for uploading your material to our research archive. To make your paper even more informative and accessible, we invite you to create a customized 'readme.md' file. This file will allow you to provide a brief overview, background information, and any other relevant details about your paper. Simply click the 'Create Readme' button below to navigate to the markdown editor and start crafting your readme.md file.";

export default function Tab({ material }: { material: IMaterial }) {
  const [modalOpened, setModalOpened] = useReducer((s) => !s, false);

  const { user } = useCurrentUser();

  const isAuthor =
    material.authorId.includes(user?.id) ||
    material.supervisorId.includes(user?.id);
  const hasReadMe = material.markdownString !== "";
  return (
    <Tabs defaultValue="first">
      <Tabs.List grow position="apart">
        <Tabs.Tab icon={<IconPhoto size={14} />} value="first">
          Readme.Md
        </Tabs.Tab>
        <Tabs.Tab icon={<IconMessageCircle size={14} />} value="second">
          Files and links
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="first" pt="xs">
        <p className="text-sub pb-10 shadow-md rounded-lg h-screen p-4 min-w-full">
          {hasReadMe ? (
            <MarkdownViewer markdownInput={material.markdownString ?? ""} />
          ) : (
            helperText
          )}
        </p>
        {isAuthor && (
          <Button
            size="sm"
            rightIcon={<IconPlus size={12} />}
            className="bg-primary-blue mt-6"
            onClick={setModalOpened}
          >
            {hasReadMe ? "Edit Readme" : "Add Readme"}
          </Button>
        )}
      </Tabs.Panel>

      <Tabs.Panel
        value="second"
        pt="xs"
        className="shadow-md rounded-lg h-screen p-4 min-w-full"
      >
        <MaterialDescription material={material} />
      </Tabs.Panel>
      <Modal
        opened={modalOpened}
        onClose={setModalOpened}
        title="Create a readme file"
        fullScreen
      >
        <LiveMarkdown
          toggleModal={setModalOpened}
          materialId={material.id}
          markdownString={material.markdownString || ""}
        />
      </Modal>
    </Tabs>
  );
}
