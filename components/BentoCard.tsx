import React from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  colSpan?: number;
  onHover: (title: string) => void;
}

export function BentoCard({
  title,
  colSpan = 1,
  onHover,
  className,
  children,
  ...props
}: BentoCardProps) {
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }[colSpan] || "md:col-span-1";

  return (
    <div
      onMouseEnter={() => onHover(title)}
      onMouseLeave={() => onHover("Nolan Carter")}
      className={cn(
        "w-full h-full flex flex-col justify-end p-[24px] md:p-[32px] rounded-[32px] backdrop-blur-[10px] bg-white/[0.08] hover:bg-white/[0.02]",
        "relative overflow-hidden group border border-white/5 transition-colors duration-300 ease-in-out",
        colSpanClass,
        className
      )}
      {...props}
    >
      <div className="flex-grow">
        {children}
      </div>
      <div className="flex justify-between items-end mt-4">
        <h3 className="text-base text-white/90">{title}</h3>
        <span className="text-white/60 group-hover:text-white transition-colors duration-300">
          ↗
        </span>
      </div>
    </div>
  );
}
