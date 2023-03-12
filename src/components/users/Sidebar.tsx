/* eslint-disable @next/next/no-img-element */
import { ActivePageAttributes, useActivePage } from "@hooks/uistate";
import useCurrentUser from "@hooks/useCurrentUser";
import { Navbar, createStyles } from "@mantine/core";
import {
  IconBook,
  IconHome,
  IconNews,
  IconPlus,
  IconReceipt2,
  IconUser,
} from "@tabler/icons";
import Link from "next/link";
import { ROLES } from "src/constants";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

interface ISidebarData {
  label: ActivePageAttributes;
  icon: typeof IconUser;
}

const data: ISidebarData[] = [
  { label: "Account", icon: IconUser },
  { label: "Materials", icon: IconReceipt2 },
  { label: "New Materials", icon: IconNews },
  { label: "Notices", icon: IconBook },
  { label: "Publish a Notice", icon: IconPlus },
];

export function NavbarSimple() {
  const { classes, cx } = useStyles();
  const { user } = useCurrentUser();
  const [activePage, setActivePage] = useActivePage();

  const links = data.map((item, index) => {
    if (index >= 2 && user.role !== ROLES.TEACHER) return null;
    return (
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.label === activePage,
        })}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActivePage(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    );
  });

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <div className="flex justify-center items-center">
          <div className="border-b-[1px] pb-4">
            <img
              src={user.image as string}
              alt={user.name as string}
              className="rounded-full pb-4"
            />
            <h3 className="text-2xl font-semibold">{user.name}</h3>
            <span className="text-slate-700">{user.bio || ""}</span>
            <p className="text-slate-600 text-xs py-2">
              Department Of Computer Science and Engineering
            </p>

            <p className="text-slate-600 text-sm ">
              Shahjalal University of Science and Technology
            </p>
          </div>
        </div>
        <div className="pt-4">
          <Link className={cx(classes.link)} href="/">
            <IconHome className={classes.linkIcon} stroke={1.5} />
            <span>Home</span>
          </Link>

          {links}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
