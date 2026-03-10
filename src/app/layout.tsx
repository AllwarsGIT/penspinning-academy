import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "./providers/themeProvider";
import ScrollUpButton from "@/components/scrollUpButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Penspinning Academy",
  description: "The most complete resource for learning pen spinning online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased `}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={(true)}
          >
            <Header />
            {children}
            <ScrollUpButton />
            <Footer />
          </ThemeProvider>
      </body>
    </html>
  );  
}
