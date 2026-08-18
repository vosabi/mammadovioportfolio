import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Instrument_Sans } from "next/font/google";
import { LangProvider } from "@/lib/lang-context";
import "./globals.css";

const GTM_ID = "GTM-K7NM6BH4";

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
      <head>
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
