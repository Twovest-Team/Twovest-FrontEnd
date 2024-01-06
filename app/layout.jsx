import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twovest",
  description: "Eco-fashion, wallet-friendly.",
};

import { Navbar } from "@/components/Navbar";
import StoreProvider from "../components/StoreProvider";
import GenderDetection from "@/components/GenderDetection";
import LastProductsSeen from "@/components/LastProductsSeen";

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
