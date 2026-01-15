import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

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
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} antialiased bg-[#0A0A0B] text-[#F5F5F5]`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <Suspense fallback={null}>
              <Cart />
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
