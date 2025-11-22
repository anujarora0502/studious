import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Studious",
  description: "A study planner for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.variable}>
        <Providers>
          <Navbar />
          <main className="container" style={{ marginTop: '3rem', paddingBottom: '3rem' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
