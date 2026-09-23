import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/queries/site-settings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const defaultMetadata: Metadata = {
  title: "LeafClutch Technology",
  description: "Learn skills and build your future.",
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const settings = await getSiteSettings(supabase);

    if (!settings?.favicon) {
      return {
        ...defaultMetadata,
        icons: { icon: "/favicon.ico" },
      };
    }

    const separator = settings.favicon.includes("?") ? "&" : "?";
    const faviconUrl = `${settings.favicon}${separator}v=${encodeURIComponent(settings.updated_at)}`;

    return {
      ...defaultMetadata,
      icons: { icon: faviconUrl },
    };
  } catch (error) {
    console.error("Failed to load the site favicon:", error);
    return {
      ...defaultMetadata,
      icons: { icon: "/favicon.ico" },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
