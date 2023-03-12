import { Card, Text } from "@mantine/core";
import { HiDownload } from "react-icons/hi";
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
      className="w-72"
    >
      <Card.Section className="flex items-center justify-between p-4">
        <Text weight={500} size="lg">
          {file.label}
        </Text>
        <HiDownload className="h-6 w-6 mr-2" />
      </Card.Section>
    </Card>
  );
}
