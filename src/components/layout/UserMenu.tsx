import { useActivePage } from "@hooks/uistate";
import useCurrentUser from "@hooks/useCurrentUser";
import {
  Avatar,
  Burger,
  Group,
  Menu,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronRight,
  IconLogout,
  IconSettings,
  IconTrash,
} from "@tabler/icons";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

export default function AccountDetails({
  sidebar = false,
}: {
  sidebar?: boolean;
}) {
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user, isLoading } = useCurrentUser();
  const setActivePage = useActivePage()[1];
  const router = useRouter();
  if (isLoading) {
    return null;
  }
  const name = user.name?.split(" ").slice(0, 2).join(" ") || "User";

  return (
    <div>
      <Burger
        opened={opened}
        onClick={toggle}
        className={classes.burger}
        size="sm"
      />

      <Menu
        width={260}
        position="bottom-end"
        transition="pop-top-right"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: userMenuOpened,
            })}
          >
            <Group
              position="apart"
              className={clsx(sidebar && "w-full flex justify-between")}
            >
              <Avatar src={user.image} alt={name} radius="xl" size={20} />
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {name}
              </Text>
              {sidebar ? (
                <IconChevronRight size={12} stroke={1.5} />
              ) : (
                <IconChevronDown size={12} stroke={1.5} />
              )}
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>General</Menu.Label>
          <Menu.Item
            icon={<IconSettings size={14} stroke={1.5} />}
            onClick={() => {
              setActivePage("Materials");
              router.push("/users/me");
            }}
          >
            My materials
          </Menu.Item>

          <Menu.Divider />
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            icon={<IconSettings size={14} stroke={1.5} />}
            onClick={() => {
              setActivePage("Account");
              router.push("/users/me");
            }}
          >
            Account settings
          </Menu.Item>

          <Menu.Item
            icon={<IconLogout size={14} stroke={1.5} />}
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Logout
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>

          <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
