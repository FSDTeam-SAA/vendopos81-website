import type { Metadata } from "next";
import "../globals.css";

import Footer from "@/components/shared/Footer";
import TopHeader from "@/components/shared/TopHeader";
import Navbar from "@/components/shared/navbar/navbar";

export const metadata: Metadata = {
  title: "Vendo Food",
  description: "This a vendo food website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F9FFF9]">
        <TopHeader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}


