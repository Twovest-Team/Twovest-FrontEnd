import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twovest",
  description: "Eco-fashion, wallet-friendly.",
};

import { Navbar } from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <Navbar/>
        {children}
      <Footer />
        </body>
    </html>
  );
}
