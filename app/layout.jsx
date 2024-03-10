import { Inter } from "next/font/google";
import Footer from "@/components/sections/Footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/navbar/Navbar";
import StoreProvider from "../components/providers/StoreProvider";
import GenderDetection from "@/components/providers/GenderDetection";
import LastProductsSeen from "@/components/sections/LastProductsSeen";
import { Cart } from "@/components/navbar/Cart";
import { SideMenu } from "@/components/navbar/SideMenu";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twovest",
  description: "Eco-fashion, wallet-friendly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* This div is needed for stopping layout-shifting when scrollbar is hidden */}
          <StoreProvider>
            <GenderDetection>
              <Navbar>
                <SideMenu />
                <Cart />
              </Navbar>
              {children}
              <LastProductsSeen />
              <Footer />
            </GenderDetection>
          </StoreProvider>
          <Analytics />
          <SpeedInsights />
      </body>
    </html>
  );
}
