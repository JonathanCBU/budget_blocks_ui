import {
  AppShell as MantineAppShell,
  Burger,
  Group,
  Title,
  NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import {
  IconHome,
  IconWallet,
  IconReceipt,
  IconSettings,
} from "@tabler/icons-react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();

  const navItems = [
    {
      label: "Home",
      icon: IconHome,
      path: "/",
    },
    {
      label: "Budgets",
      icon: IconWallet,
      path: "/budgets",
    },
    {
      label: "Line Items",
      icon: IconReceipt,
      path: "/line-items",
    },
    {
      label: "Settings",
      icon: IconSettings,
      path: "/settings",
    },
  ];

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap="xs">
            <IconWallet size={28} stroke={2} />
            <Title
              order={3}
              component={Link}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Budget Blocks
            </Title>
          </Group>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            component={Link}
            to={item.path}
            label={item.label}
            leftSection={<item.icon size={20} stroke={1.5} />}
            active={location.pathname === item.path}
            onClick={close}
            mb="xs"
          />
        ))}
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
