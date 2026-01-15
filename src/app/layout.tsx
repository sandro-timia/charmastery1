import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
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
  title: "Charmastery | Master the Art of Illusion",
  description:
    "Learn professional magic from world-class performers. Premium video tutorials, live workshops, and secrets from the masters. Enter a world where the impossible becomes possible.",
  keywords: [
    "magic tricks",
    "learn magic",
    "illusion tutorials",
    "card tricks",
    "sleight of hand",
    "mentalism",
    "magic workshops",
  ],
  authors: [{ name: "Charmastery" }],
  openGraph: {
    title: "Charmastery | Master the Art of Illusion",
    description:
      "Learn professional magic from world-class performers. Premium video tutorials and live workshops.",
    type: "website",
    locale: "en_US",
    siteName: "Charmastery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charmastery | Master the Art of Illusion",
    description:
      "Learn professional magic from world-class performers. Premium video tutorials and live workshops.",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} antialiased bg-[#0A0A0B] text-[#F5F5F5]`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <Cart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
