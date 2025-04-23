import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import { Lora } from "next/font/google";
import { Schibsted_Grotesk } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kalakriti - Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${schibsted.className} antialiased bg-black`}>
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
