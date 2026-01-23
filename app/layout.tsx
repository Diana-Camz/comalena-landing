import type { Metadata } from "next";
import { Chicle, Geist_Mono, Anton, Special_Gothic_Condensed_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type RootLayoutProps = {
  children: React.ReactNode;
};

const geistChicle = Chicle({
  variable: "--font-chicle",
  subsets: ["latin"],
  weight: '400'
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: '400'
});
const gothic = Special_Gothic_Condensed_One({
  variable: "--font-gothic",
  subsets: ["latin"],
  weight: '400'
});

export const metadata: Metadata = {
  title: "Comaleña Pizza | Colima, México",
  description: "Pizza artesanal al horno de leña",
};

export default function RootLayout({
  children,
}: Readonly<
  RootLayoutProps
>) {
  return (
    <html lang="en" className={`${geistChicle.variable} ${geistMono.variable} ${anton.variable} ${gothic.variable}`}>
      <body
      className="bg-background text-card-foreground font-sans antialiased">
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
