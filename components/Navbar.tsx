"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "experiments", href: "/experiments" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    // CAMBIO QUI: Aggiunto flex-col gap-4 py-4 per il mobile, e ripristinato flex-row h-[76px] py-0 per i min-[700px]
    <header className="absolute top-0 left-0 right-0 w-full max-w-[1600px] mx-auto min-h-[76px] py-4 min-[700px]:py-0 flex flex-col min-[700px]:flex-row justify-center min-[700px]:justify-between items-center px-4 min-[700px]:px-8 bg-transparent z-50 pointer-events-auto gap-4 min-[700px]:gap-0">
      
      {/* Logo / Nome (Centrato su mobile, a sinistra su desktop) */}
      <div className="flex-shrink-0 flex items-center justify-center">
        {/* rimosso translate-x-[10px] su mobile per centrarlo perfettamente */}
        <Link href="/" className="group relative overflow-hidden inline-flex text-white font-medium text-xl tracking-tighter min-[700px]:translate-x-[10px]">
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

      {/* Navigazione (Centrata su mobile, a destra su desktop) */}
      <nav className="flex space-x-2 sm:space-x-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "group relative px-2 sm:px-3 py-2 text-sm font-medium transition-colors",
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