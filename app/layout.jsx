import { Inter } from "next/font/google";
import Footer from "@/components/sections/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twovest",
  description: "Eco-fashion, wallet-friendly.",
};

import { Navbar } from "@/components/navbar/Navbar";
import StoreProvider from "../components/providers/StoreProvider";
import GenderDetection from "@/components/providers/GenderDetection";
import LastProductsSeen from "@/components/sections/LastProductsSeen";

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <StoreProvider>
          <GenderDetection>
            <Navbar />
              {children}
            <LastProductsSeen />
            <Footer />
          </GenderDetection>
        </StoreProvider>
      </body>
    </html>
  );
}
