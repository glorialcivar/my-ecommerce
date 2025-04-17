import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "My E-commerce",
    template: "%s | My E-commerce",
  },
  description: "A modern e-commerce platform built with Next.js and Supabase",
  keywords: ["e-commerce", "next.js", "supabase", "typescript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "My E-commerce",
    description: "A modern e-commerce platform built with Next.js and Supabase",
    siteName: "My E-commerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "My E-commerce",
    description: "A modern e-commerce platform built with Next.js and Supabase",
    creator: "@yourtwitter",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
