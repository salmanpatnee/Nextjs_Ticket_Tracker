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

const Navbar = () => {
  const pathName = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets/list" },
  ];

  return (
    <nav className="border-b mb-5 h-14 px-5 flex items-center">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="6">
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-900": link.href === pathName,
                      "text-zinc-400": link.href !== pathName,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status == "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="focus:outline-none hover:outline-none active:outline-none hover:bg-transparent active:bg-transparent focus:bg-transparent">
                  <Button
                    variant="ghost"
                    className="focus:outline-none hover:outline-none active:outline-none hover:bg-transparent active:bg-transparent focus:bg-transparent"
                  >
                    <Avatar
                      src={session.user!.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                      className="cursor-pointer"
                    />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="red">
                    <Link href="/api/auth/signout" className="w-full">
                      Logout
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status == "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
