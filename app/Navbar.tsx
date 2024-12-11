"use client";
import { Container } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const Navbar = () => {
  const pathName = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets" },
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
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
