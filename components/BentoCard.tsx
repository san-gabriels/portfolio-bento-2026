import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link"; // 1. Aggiunto l'import per i link di Next.js

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> {
  title: string;
  colSpan?: number;
  onHover: (title: string) => void;
  noPadding?: boolean;
  hideTitle?: boolean;
  href?: string; // 2. Aggiunta la prop opzionale per l'URL
}

export function BentoCard({
  title,
  colSpan = 1,
  onHover,
  className,
  children,
  noPadding = false,
  hideTitle = false,
  href, // Estratta la prop
  ...props
}: BentoCardProps) {
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }[colSpan] || "md:col-span-1";

  // Raggruppiamo le classi per non doverle riscrivere
  const containerClasses = cn(
    "h-full w-full flex flex-col justify-end rounded-[32px] backdrop-blur-[10px] bg-white/[0.08] hover:bg-white/[0.02]",
    "relative overflow-hidden group border border-white/5 transition-colors duration-300 ease-in-out cursor-pointer", // Aggiunto cursor-pointer
    !noPadding && "p-[24px] md:p-[32px]",
    colSpanClass,
    className
  );

  // Impacchettiamo il contenuto per mantenere il codice DRY (Don't Repeat Yourself)
  const innerContent = (
    <>
      <div className={cn("flex-grow", noPadding && "h-full w-full absolute inset-0")}>
        {children}
      </div>
      {!hideTitle && (
        <div className="flex justify-between items-end mt-4 relative z-10">
          
          {/* Animazione Titolo a Onda (Staggered) */}
          <div className="relative overflow-hidden inline-flex text-base text-white/90">
            <span className="flex">
              {title.split("").map((char, index) => (
                <span
                  key={`top-${index}`}
                  className="transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
                  style={{ transitionDelay: `${index * 20}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="absolute inset-0 flex text-white">
              {title.split("").map((char, index) => (
                <span
                  key={`bottom-${index}`}
                  className="transform translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                  style={{ transitionDelay: `${index * 20}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </div>

          {/* Freccia Statica (Solo cambio colore) */}
          <span className="text-white/60 group-hover:text-white transition-colors duration-300">
            ↗
          </span>

        </div>
      )}
    </>
  );

  // 3. LOGICA DI RENDERING: Se c'è un href, usiamo <Link>, altrimenti <div>
  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={() => onHover(title)}
        onMouseLeave={() => onHover("Gabriel Mihali")}
        className={containerClasses}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={() => onHover(title)}
      onMouseLeave={() => onHover("Gabriel Mihali")}
      className={containerClasses}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {innerContent}
    </div>
  );
}