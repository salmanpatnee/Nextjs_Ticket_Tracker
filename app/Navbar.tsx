"use client";
import { Box, Container } from "@radix-ui/themes";
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
        <div className="flex space-x-6 items-center">
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
          <Box>
            {status == "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
            {status == "authenticated" && (
              <Link href="/api/auth/signout">Logout</Link>
            )}
          </Box>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
