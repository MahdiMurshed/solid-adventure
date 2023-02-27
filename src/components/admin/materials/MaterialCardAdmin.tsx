import IconWrapper from "@components/IconWrapper";
import useTopMaterialActions from "@hooks/admin/useTopMaterialActions";
import { Avatar, Card, Group, Spoiler, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons";

export function TaskCard({ material }: any) {
  const { title, abstract, authors, supervisors, id } = material;

  const { handleRemoveFromTheToTop } = useTopMaterialActions({
    materialIds: [id],
  });

  return (
    <Card withBorder radius="md" className="py-6 mb-4">
      <Group position="apart">
        <Text size="lg" weight={500} mt="md">
          {title}
        </Text>
        <IconWrapper label="Remove from the top" color="red">
          <IconTrash
            size={16}
            stroke={1.5}
            color="red"
            onClick={handleRemoveFromTheToTop}
          />
        </IconWrapper>
      </Group>

      <Spoiler showLabel="" maxHeight={120} hideLabel="Hide">
        <Text size="sm" color="dimmed" mt={5}>
          {abstract}
        </Text>
      </Spoiler>

      <Group position="apart" mt="md">
        <Avatar.Group spacing="sm">
          {authors
            .concat(supervisors)
            .map((author: { name: string; image: string }) => (
              <Avatar src={author.image} radius="xl" key={author.name} />
            ))}
        </Avatar.Group>
      </Group>
    </Card>
  );
}
