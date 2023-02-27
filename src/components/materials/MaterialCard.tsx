import CustomBadge from "@components/CustomBadge";
import { useMaterial } from "@hooks/material";
import { Card, Group, Spoiler, Text } from "@mantine/core";
import Link from "next/link";

export default function MaterialCard({ materialId }: { materialId: string }) {
  const { material, isLoading } = useMaterial({ materialId });

  if (isLoading) return <div>Loading...</div>;
  return (
    <Card
      shadow="sm"
      px="lg"
      radius="md"
      withBorder
      className="w-72 min-h-full"
    >
      <Group position="apart">
        <Link
          className="text-sm font-medium cursor-pointer "
          href={`/materials/${materialId}`}
        >
          {material.title}
        </Link>
        <div className="flex gap-2 ">
          {material.tags?.map((tag: any, index) => (
            <CustomBadge key={tag.id} index={index} size="xs">
              {tag.name}
            </CustomBadge>
          ))}
        </div>
      </Group>

      <Spoiler showLabel="" maxHeight={120} hideLabel="Hide">
        <Text size="xs" pt={8} color="dimmed">
          {material.abstract}
        </Text>
      </Spoiler>
    </Card>
  );
}
