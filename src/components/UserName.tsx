import { Avatar, Group, Text } from "@mantine/core";
import { memo } from "react";
import { Capitalizer } from "src/lib/helpers";

const UserName = ({ name, image }: { name: string; image: string }) => {
  return (
    <Group spacing="sm">
      <Avatar size={30} src={image} radius={30} />
      <Text size="sm" weight={500}>
        {Capitalizer(name)}
      </Text>
    </Group>
  );
};
export default memo(UserName);
