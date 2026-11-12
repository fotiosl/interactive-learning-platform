import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IS_PUBLIC_MODE } from "@/lib/appMode";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: IS_PUBLIC_MODE
    ? "Interactive Learning Platform | Übungen, Probetests & Java-Labor"
    : "Lernplattform | Individuelle Aufgaben & Nachhilfe",
  description: IS_PUBLIC_MODE
    ? "Modulare Open-Source-Lernplattform mit interaktiven Fachmodulen, Probetests und isoliertem Browser-Java-Runner."
    : "Interaktive Aufgaben und Lernmaterialien für Schülerinnen und Schüler",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} light h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
