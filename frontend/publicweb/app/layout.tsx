import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ghorer Bazar | Pure & Organic Food in Bangladesh",
  description: "Ghorer Bazar offers premium quality organic and healthy foods like Organic Honey, Mustard Oil, Dates, Mangoes, Ghee, and Spices directly from the source.",
  keywords: "organic food, bangladesh, honey, dates, ghee, mustard oil, ghorer bazar, healthy food, buy online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable} data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
