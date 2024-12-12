"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import {Skeleton} from "@/app/components"

const Navbar = () => {
  return (
    <nav className="border-b mb-5 h-14 px-5 flex items-center">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="6">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const pathName = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "!text-zinc-900": link.href === pathName,
              "nav-link": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="focus:outline-none hover:outline-none active:outline-none hover:bg-transparent active:bg-transparent focus:bg-transparent">
          <Button
            variant="ghost"
            className="focus:outline-none hover:outline-none active:outline-none hover:bg-transparent active:bg-transparent focus:bg-transparent"
          >
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">
            <Link href="/api/auth/signout" className="w-full">
              Logout
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
