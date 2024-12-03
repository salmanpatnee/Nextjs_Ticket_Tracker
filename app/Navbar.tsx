"use client";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 px-5 items-center">
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
    </nav>
  );
};

export default Navbar;
