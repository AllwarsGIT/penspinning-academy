import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "./providers/themeProvider";
import { DominantHandProvider } from "./providers/dominantHandProvider"
import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollUpButton from "@/components/scrollUpButton";
import SmoothScroll from "@/components/SmoothScroll"


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
    description: "Aiming to be the most powerful resource to learn penspinning.",
    openGraph: {
        title: "Penspinning Academy",
        description: "Aiming to be the most powerful resource to learn penspinning.",
        url: "https://penspinning-academy.vercel.app",
        siteName: "Penspinning Academy",
        images: [{ url: "/logo.svg", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Penspinning Academy",
        description: "Aiming to be the most powerful resource to learn penspinning.",
        images: ["/logo.svg"],
    }
}

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
            <DominantHandProvider>
              <SmoothScroll>
                <Header />
                      {children}
                  <ScrollUpButton/>
                <Footer />
              </SmoothScroll>
            </DominantHandProvider>
          </ThemeProvider>
      </body>
    </html>
  );  
}
