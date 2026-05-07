"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/za-roditelje", label: "Za roditelje" },
  { href: "/za-decu", label: "Za decu" },
  { href: "/sprint", label: "Za maturu" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-base-100/85 backdrop-blur-md border-b border-base-200 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between min-h-16 py-3">
          <Logo size="md" />

          <div className="flex items-center gap-1 md:gap-2">
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-base-content/80 hover:text-primary rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-circle btn-sm md:hidden"
              aria-label="Meni"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden border-t border-base-200 bg-base-100 overflow-hidden transition-all",
          open ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 font-medium text-base-content/80 hover:text-primary rounded-lg hover:bg-base-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
