import { Tabs } from "@mantine/core";
import { IconMessageCircle, IconPhoto } from "@tabler/icons";

export default function UserTab() {
  return (
    <Tabs defaultValue="first">
      <Tabs.List grow position="apart">
        <Tabs.Tab
          icon={<IconPhoto size={14} />}
          value="first"
          className="text-lg font-semibold"
        >
          User Information
        </Tabs.Tab>
        <Tabs.Tab
          icon={<IconMessageCircle size={14} />}
          value="second"
          className="text-lg font-semibold"
        >
          Materials
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel
        value="first"
        pt="xs"
        className="shadow-md rounded-lg h-screen p-4 min-w-full"
      >
        <h3>here</h3>
      </Tabs.Panel>

      <Tabs.Panel
        value="second"
        pt="xs"
        className="shadow-md rounded-lg h-screen p-4 min-w-full"
      >
        <h3>here</h3>
      </Tabs.Panel>
    </Tabs>
  );
}
