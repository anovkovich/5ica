"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Force-scrolls to top on every pathname change.
 * Bypasses CSS `scroll-behavior: smooth` (koji je za anchor linkove).
 * Default Next.js scroll-to-top može biti nepouzdan na mobilnom kad je smooth-scroll aktivan.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip ako URL ima hash (anchor link — smooth scroll do tog elementa)
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
