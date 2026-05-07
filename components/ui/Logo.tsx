import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string | null;
  className?: string;
  variant?: "image" | "text";
};

const heights = {
  sm: 28,
  md: 40,
  lg: 64,
  xl: 96,
};

const textSizes = {
  sm: { five: "text-2xl", ica: "text-lg" },
  md: { five: "text-3xl", ica: "text-xl" },
  lg: { five: "text-5xl", ica: "text-3xl" },
  xl: { five: "text-7xl md:text-8xl", ica: "text-4xl md:text-5xl" },
};

export function Logo({
  size = "md",
  href = "/",
  className,
  variant = "image",
}: LogoProps) {
  const h = heights[size];
  const w = Math.round(h * 1.365);

  const content =
    variant === "image" ? (
      <Image
        src="/5ica.png"
        alt="5ica"
        width={w * 4}
        height={h * 4}
        priority
        className={cn("block", className)}
        style={{ width: w, height: h, objectFit: "contain" }}
      />
    ) : (
      <span className={cn("inline-flex items-baseline font-bold", className)}>
        <span
          className={cn(textSizes[size].five, "text-secondary leading-none -mr-0.5")}
        >
          5
        </span>
        <span
          className={cn(textSizes[size].ica, "text-base-content leading-none")}
        >
          ica
        </span>
      </span>
    );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label="5ica početna"
    >
      {content}
    </Link>
  );
}
