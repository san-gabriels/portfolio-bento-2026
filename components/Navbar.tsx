"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const links = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Experiments", href: "/experiments" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const segments = pathname.split("/").filter(Boolean);
  const isHome = segments.length === 0;
  const isLevel2 = segments.length === 1;
  const isLevel3 = segments.length >= 2;

  let logoText = "Gabriel Mihali";
  let logoHref = "/";
  let showArrow = false;

  if (isLevel2) {
    logoText = "Home";
    logoHref = "/";
    showArrow = true;
  } else if (isLevel3) {
    logoText = "Back";
    logoHref = `/${segments.slice(0, -1).join("/")}`;
    showArrow = true;
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none">
      
      {/* LO SFONDO GLASS CON SFUMATURA */}
      <div 
        className={cn(
          "absolute top-0 left-0 w-full h-[120px] transition-opacity duration-700 ease-out -z-10",
          isScrolled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 30%, transparent 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
        }}
      />

      <div className="relative max-w-[1600px] mx-auto h-[76px] flex justify-between items-center px-4 min-[700px]:px-8 pointer-events-auto">
        
        {/* LOGO / TASTO INDIETRO */}
        <div className="flex-shrink-0 flex items-center">
          <Link href={logoHref} className="group flex items-center gap-2 text-white font-medium text-base md:text-xl tracking-tighter transition-opacity hover:opacity-80">
            
            {/* ECCO LA FRECCIA SVG INSERITA NEL POSTO GIUSTO */}
            {showArrow && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4.5 h-4.5 text-white transform transition-all duration-300 ease-out group-hover:-translate-x-1 -mr-1 -mt-0.5"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            )}

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

        {/* NAVIGAZIONE DESKTOP */}
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
      </div>
    </header>
  );
}