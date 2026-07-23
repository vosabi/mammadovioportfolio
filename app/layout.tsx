import type { Metadata } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import { LangProvider } from "@/lib/lang-context";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Sənan Məmmədov — AI Developer",
  description: "Süni intellektlə real biznes problemlərini həll edən alətlər qururam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className={`${archivo.variable} ${instrumentSans.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
