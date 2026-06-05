import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-admin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel | E-Commerce",
  description: "Operations dashboard for managing products, orders, customers, and storefront settings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
