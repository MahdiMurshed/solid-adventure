import AccountDetails from "@components/layout/UserMenu";
import {
  Box,
  Code,
  Group,
  Navbar,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  IconAdjustments,
  IconBook,
  IconCalendarStats,
  IconGauge,
  IconLock,
  IconReceipt2,
  IconUser,
} from "@tabler/icons";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { LinksGroup } from "./NavbarLinkgroup";

const mockdata = [
  {
    label: "Users",
    icon: IconUser,
    initiallyOpened: true,
    links: [
      { label: "Teachers", link: "/admin/teachers" },
      { label: "Students", link: "/admin/students" },
      { label: "Admins", link: "/admin/admins" },
    ],
  },
  {
    label: "Requests",
    icon: IconCalendarStats,
    links: [
      { label: "Student requests", link: "/admin/students/requests" },
      { label: "Teacher requests", link: "/admin/teachers/requests" },
    ],
  },
  {
    label: "Materials",
    icon: IconReceipt2,
    links: [
      { label: "Top Materials", link: "/admin/materials/top-materials" },
      { label: "All Materials", link: "/admin/materials" },
    ],
  },
  {
    label: "Fields",
    icon: IconLock,
    links: [
      { label: "Category", link: "/admin/categories" },
      { label: "Tags", link: "/admin/tags" },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function AdminSidebar() {
  const { classes } = useStyles();
  const router = useRouter();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Text size="lg" weight="bold">
            Admin Panel
          </Text>
          <Code color="pink">admin</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>
          <UnstyledButton
            onClick={() => null}
            className={clsx(
              classes.control,
              "/admin/create-notice" === router.pathname
                ? classes.linkActive
                : ""
            )}
          >
            <Link href="/admin/create-notice">
              <Group position="apart" spacing={0}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ThemeIcon variant="light" size={30}>
                    <IconBook size={18} />
                  </ThemeIcon>
                  <Box ml="md">Create Notices</Box>
                </Box>
              </Group>
            </Link>
          </UnstyledButton>
          <UnstyledButton
            onClick={() => null}
            className={clsx(
              classes.control,
              "/admin/dashboard" === router.pathname ? classes.linkActive : ""
            )}
          >
            <Link href="/admin/dashboard">
              <Group position="apart" spacing={0}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ThemeIcon variant="light" size={30}>
                    <IconGauge size={18} />
                  </ThemeIcon>
                  <Box ml="md">Dashboard</Box>
                </Box>
              </Group>
            </Link>
          </UnstyledButton>
          <UnstyledButton
            onClick={() => null}
            className={clsx(
              classes.control,
              "/admin/notices" === router.pathname ? classes.linkActive : ""
            )}
          >
            <Link href="/admin/notices">
              <Group position="apart" spacing={0}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ThemeIcon variant="light" size={30}>
                    <IconBook size={18} />
                  </ThemeIcon>
                  <Box ml="md">Notices</Box>
                </Box>
              </Group>
            </Link>
          </UnstyledButton>
          {links}

          <Link href="/admin/materials" className={classes.control}>
            <Group position="apart" spacing={0}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon variant="light" size={30}>
                  <IconAdjustments size={18} />
                </ThemeIcon>
                <Box ml="md">Settings</Box>
              </Box>
            </Group>
          </Link>
        </div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <AccountDetails sidebar />
      </Navbar.Section>
    </Navbar>
  );
}
