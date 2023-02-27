import { Avatar, Group, Text, createStyles } from "@mantine/core";
import { IconAt, IconPhoneCall } from "@tabler/icons";
import Link from "next/link";
import { Capitalizer } from "src/lib/helpers";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  image: string;
  name: string;
  title: string;
  contactNumber: string;
  email: string;
  userId: string;
}

export function UserInfoIcons({
  image,
  name,
  title,
  contactNumber,
  email,
  userId,
}: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={image} size={94} radius="md" />
        <div>
          <Text
            size="xs"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
          >
            {title}
          </Text>

          <Text size="md" weight={500} className={classes.name}>
            <Link href={`/users/${userId}`}>{Capitalizer(name)}</Link>
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {contactNumber}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
