import CustomButton from "@components/CustomButton";
import { Burger, Center, Container, Group, Header, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { links } from "src/constants";
import AccountDetails from "./UserMenu";
import useStyles, { HEADER_HEIGHT } from "./styles";

export default function HeaderAction() {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const pathname = router.pathname;

  const isOnLandingPage = pathname === "/";

  const { data: session } = useSession();

  // console.log(session);

  const handleNavigation = (
    e: MouseEvent,
    item: {
      link: string;
      label: string;
    }
  ) => {
    e.preventDefault();
    const element = document.getElementById(item.label);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = links.map((link, ind) => {
    if (ind === 3 && !session) {
      return;
    }
    const menuItems = link.links?.map((item) => (
      <Menu.Item
        key={item.link}
        onClick={(e: MouseEvent) => handleNavigation(e, item)}
        className="font-semibold"
      >
        {item.label}
      </Menu.Item>
    ));

    if (menuItems && isOnLandingPage) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Link
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <Header
      height={HEADER_HEIGHT}
      className="border-b-primary-bg shadow-sm  bg-primary-bg sticky"
    >
      <Container className={clsx(classes.inner)} fluid>
        <Group position="apart">
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          {/* <Text className="text-lg font-bold text-primary-gray">{title}</Text> */}
          {/* <Search /> */}
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </Group>
        {session ? (
          <AccountDetails />
        ) : (
          <>
            <CustomButton handleSubmit={() => signIn("google")}>
              Log In
            </CustomButton>
          </>
        )}
      </Container>
    </Header>
  );
}
