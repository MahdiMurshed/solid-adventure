import CustomBadge from "@components/CustomBadge";
import { useMaterial } from "@hooks/material";
import { Card, Text } from "@mantine/core";
import Link from "next/link";

export default function MaterialLargeCard({
  materialId,
}: {
  materialId: string;
}) {
  const { material, isLoading } = useMaterial({ materialId });

  if (isLoading) return <div>Loading...</div>;
  return (
    <Card shadow="sm" px="lg" radius="md" withBorder>
      <Link
        className="cursor-pointer text-xl font-semibold "
        href={`/materials/${materialId}`}
      >
        {material.title}
      </Link>

      <div className="flex gap-2 py-2">
        {material.tags?.map((tag: any, index) => (
          <CustomBadge key={tag.id} index={index} size="md">
            {tag.name}
          </CustomBadge>
        ))}
      </div>

      <Text size="sm" pt={8} color="dimmed">
        {material.abstract}
      </Text>
    </Card>
  );
}
