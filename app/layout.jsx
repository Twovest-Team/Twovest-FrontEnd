import { Inter } from "next/font/google";
import Footer from "@/components/sections/FooterMP";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/navbar/NavbarMP";
import StoreProvider from "../components/providers/StoreProvider";
import GenderProvider from "@/components/providers/GenderProvider";
import LastProductsSeen from "@/components/sections/LastProductsSeen";
import { Cart } from "@/components/navbar/Cart";
import { SideMenu } from "@/components/navbar/SideMenuMP";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ManageCollectionModal from "@/components/collections/ManageCollectionsModal";
import { Suspense } from "react";
import UserProvider from "@/components/providers/UserProvider";
import Notification from "@/components/modals/Notification";

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
          <GenderProvider>
            <UserProvider>
              <Navbar>
                <SideMenu />
                <Cart />
              </Navbar>
              {children}
              {/* <LastProductsSeen /> */}
              <Footer />

              {/* GLOBAL MODALS AND NOTIFICATIONS */}
              {/* <Suspense>
                <ManageCollectionModal />

                <Notification
                  id={"removedLook"}
                  type={"Neutral"}
                  message={"Look removido"}
                />

                <Notification
                  id={"savedLook"}
                  type={"Neutral"}
                  message={"Look guardado"}
                />

                <Notification
                  id={"errorRemovingLook"}
                  type={"Error"}
                  message={"Não foi possível remover o look"}
                />

                <Notification
                  id={"errorSavingLook"}
                  type={"Error"}
                  message={"Não foi possível guardar o look"}
                />

              </Suspense> */}


            </UserProvider>
          </GenderProvider>
        </StoreProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
