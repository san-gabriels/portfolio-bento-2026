import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function BentoCard({
  title,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}: BentoCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "flex flex-col justify-between relative overflow-hidden group h-full",
        "bg-white/[0.02] backdrop-blur-3xl rounded-[2rem] border border-white/[0.06]",
        "p-6 md:p-8 transition-colors duration-500 hover:bg-white/[0.04]",
        className
      )}
      {...props}
    >
      <div className="flex-1 relative z-10 w-full">{children}</div>
      <div className="flex justify-between items-end relative z-10 w-full mt-auto">
        <h2 className="text-xl md:text-2xl tracking-tight text-white/90">
          {title}
        </h2>
        <div className="flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight className="w-5 h-5 text-white/80" />
        </div>
      </div>
    </div>
  );
}
