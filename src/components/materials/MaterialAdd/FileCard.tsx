import { Card, Text } from "@mantine/core";
import { ILink } from "src/types";

export default function FileCard({ file }: { file: ILink }) {
  return (
    <Card
      shadow="sm"
      p="xl"
      component="a"
      withBorder
      href={file.url}
      target="_blank"
      rel="noreferrer"
      download
      className="w-72 bg-primary-blue text-white"
    >
      <Card.Section></Card.Section>

      <Text weight={500} size="lg" mt="md">
        {file.label}
      </Text>
    </Card>
  );
}
