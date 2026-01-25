import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import ClientProviders from "@/components/ClientProviders";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: true });

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charmastery | Domina el Arte de la Ilusión",
  description:
    "Aprende magia profesional de artistas de clase mundial. Tutoriales en video premium, talleres en vivo y secretos de los maestros. Entra a un mundo donde lo imposible se hace posible.",
  keywords: [
    "trucos de magia",
    "aprender magia",
    "tutoriales de ilusión",
    "trucos de cartas",
    "prestidigitación",
    "mentalismo",
    "talleres de magia",
  ],
  authors: [{ name: "Charmastery" }],
  openGraph: {
    title: "Charmastery | Domina el Arte de la Ilusión",
    description:
      "Aprende magia profesional de artistas de clase mundial. Tutoriales en video premium y talleres en vivo.",
    type: "website",
    locale: "es_ES",
    siteName: "Charmastery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charmastery | Domina el Arte de la Ilusión",
    description:
      "Aprende magia profesional de artistas de clase mundial. Tutoriales en video premium y talleres en vivo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Preconnect a orígenes externos críticos para mejorar LCP - crossorigin requerido para CORS */}
        <link rel="preconnect" href="https://charmastery-aa589.firebaseapp.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://apis.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://q.clarity.ms" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://scripts.clarity.ms" crossOrigin="anonymous" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} antialiased bg-[#0A0A0B] text-[#F5F5F5]`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <ClientProviders>
          <Header />
          {children}
          <Footer />
          <Suspense fallback={null}>
            <Cart />
          </Suspense>
          <CookieConsent />
        </ClientProviders>

        {/* Microsoft Clarity - lazyOnload reduce main-thread y reflows en carga inicial */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "v6kfk7rm64");`}
        </Script>
      </body>
    </html>
  );
}
