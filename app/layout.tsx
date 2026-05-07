import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "5ica — Vežbaj za peticu",
    template: "%s | 5ica",
  },
  description:
    "Gejmifikovana aplikacija u kojoj deca vežbaju svoje vijuge i pripremaju se za malu maturu. Za 1-8. razred.",
  keywords: [
    "mala matura",
    "priprema za malu maturu",
    "vežbanje matematike",
    "kvizovi za osnovnu školu",
    "5ica",
    "petica",
    "edukativna aplikacija",
  ],
  authors: [{ name: "5ica" }],
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: "5ica",
    title: "5ica — Vežbaj za peticu",
    description:
      "Gejmifikovana aplikacija u kojoj deca vežbaju svoje vijuge i pripremaju se za malu maturu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "5ica — Vežbaj za peticu",
    description:
      "Gejmifikovana aplikacija u kojoj deca vežbaju svoje vijuge i pripremaju se za malu maturu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" data-theme="petica" className={inter.variable}>
      <body className="font-sans bg-base-100 text-base-content antialiased">
        {children}
        <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}
