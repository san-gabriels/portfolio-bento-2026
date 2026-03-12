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
    <header className="absolute top-0 left-0 right-0 w-full max-w-[1600px] mx-auto h-[76px] flex justify-between items-center px-4 min-[700px]:px-8 bg-transparent z-50 pointer-events-auto">
      
      {/* Logo / Nome a Sinistra */}
      <div className="flex-shrink-0">
        <Link href="/" className="group relative overflow-hidden inline-flex text-white font-bold text-xl tracking-tighter translate-x-[10px]">
          <span className="flex">
            {"Gabriel Mihali".split("").map((char, index) => (
              <span
                key={`top-nav-${index}`}
                className="transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span className="absolute inset-0 flex">
            {"Gabriel Mihali".split("").map((char, index) => (
              <span
                key={`bottom-nav-${index}`}
                className="transform translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </Link>
      </div>

      {/* Navigazione a Destra */}
      <nav className="flex space-x-1 sm:space-x-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "group relative px-3 py-2 text-sm font-medium transition-colors",
                // Qui avviene la magia: Bianco se attivo, Grigio al 60% se inattivo
                isActive ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              {/* ANIMAZIONE A ONDA PER I LINK */}
              <div className="relative overflow-hidden inline-flex">
                <span className="flex">
                  {link.name.split("").map((char, index) => (
                    <span
                      key={`top-link-${link.name}-${index}`}
                      className="transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
                      style={{ transitionDelay: `${index * 20}ms` }} 
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
                <span className="absolute inset-0 flex text-white">
                  {link.name.split("").map((char, index) => (
                    <span
                      key={`bottom-link-${link.name}-${index}`}
                      className="transform translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                      style={{ transitionDelay: `${index * 20}ms` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}