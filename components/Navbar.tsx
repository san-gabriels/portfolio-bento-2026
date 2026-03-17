"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Experiments", href: "/experiments" },
];

export function Navbar() {
  const pathname = usePathname();

  // Calcoliamo la profondità della pagina per cambiare la logica
  const segments = pathname.split("/").filter(Boolean);
  const isHome = segments.length === 0;
  const isLevel2 = segments.length === 1;
  const isLevel3 = segments.length >= 2;

  // Impostiamo testo e link dinamicamente
  let logoText = "Gabriel Mihali";
  let logoHref = "/";
  let showArrow = false;

  if (isLevel2) {
    logoText = "Home";
    logoHref = "/";
    showArrow = true;
  } else if (isLevel3) {
    logoText = "Back";
    logoHref = `/${segments.slice(0, -1).join("/")}`; // Torna alla cartella superiore
    showArrow = true;
  }

  return (
    <header className="absolute top-0 left-0 right-0 w-full max-w-[1600px] mx-auto h-[76px] flex justify-between items-center px-4 min-[700px]:px-8 bg-transparent z-50 pointer-events-auto">
      
      {/* LOGO / TASTO INDIETRO */}
      <div className="flex-shrink-0 flex items-center">
        <Link href={logoHref} className="group flex items-center gap-2 text-white font-medium text-xl tracking-tighter transition-opacity hover:opacity-80">
          
          {/* FRECCIA: Scivola a sinistra al passaggio del mouse */}
          {showArrow && (
            <span className="text-white/60 group-hover:text-white transform transition-all duration-300 ease-out group-hover:-translate-x-1">
              ←
            </span>
          )}

          {/* TESTO: Animazione a onda per Qualsiasi testo (Logo, Home o Back) */}
          <span className="relative overflow-hidden inline-flex min-[700px]:translate-x-[10px]">
            <span className="flex">
              {logoText.split("").map((char, index) => (
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
              {logoText.split("").map((char, index) => (
                <span
                  key={`bottom-nav-${index}`}
                  className="transform translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                  style={{ transitionDelay: `${index * 25}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </span>
        </Link>
      </div>

      {/* NAVIGAZIONE DESKTOP (Nascosta su Mobile) */}
      <nav className="hidden min-[700px]:flex space-x-1 sm:space-x-4">
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