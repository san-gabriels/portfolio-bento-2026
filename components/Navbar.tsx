"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between px-4 md:px-8 py-6 backdrop-blur-md border-b border-white/5 bg-transparent">
      <div className="flex-shrink-0">
        <Link href="/" className="text-white font-bold text-xl tracking-tighter">
          Logo
        </Link>
      </div>
      <nav className="flex space-x-1 sm:space-x-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="navbar-active-underline"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
