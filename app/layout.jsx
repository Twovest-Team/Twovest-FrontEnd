import { Inter } from "next/font/google";
import Footer from "@/components/sections/Footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar/Navbar";
import StoreProvider from "../components/providers/StoreProvider";
import LastProductsSeen from "@/components/sections/LastProductsSeen";
import { Cart } from "@/components/navbar/Cart";
import { SideMenu } from "@/components/navbar/SideMenu";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ManageCollectionModal from "@/components/collections/ManageCollectionsModal";
import Notification from "@/components/modals/Notification";
import SustainabilityModal from "@/components/modals/SustainabilityModal";
import AuthModal from "@/components/modals/AuthModal";
import OnboardingModal from "@/components/modals/OnboardingModal";
import ModalSubmitLook from "@/components/modals/ModalSubmitLook";
import CookieWarning from "./Cookies/CookieWarning";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twovest",
  description: "Eco-fashion, wallet-friendly.",
};

export default function RootLayout({ children, params }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
            <Navbar>
              <SideMenu gender={params.gender} />
              <Cart />
            </Navbar>
            {children}
            <LastProductsSeen />
            <Footer />

            {/* GLOBAL MODALS AND NOTIFICATIONS */}
            <ManageCollectionModal />
            <SustainabilityModal />
            <AuthModal />
            <OnboardingModal />
            <ModalSubmitLook />

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

            <Notification
              id={"favoriteButton"}
              type={"Neutral"}
              message={"Adicionado aos favoritos"}
            />

            <Notification
              id="removeFromCart"
              type="Neutral"
              message="Artigo removido"
            />

            <Notification
              id={'buyButton'}
              type={"Success"}
              message={"Artigo adicionado"}
            />

            <Notification
              id={'formError'}
              type={"Error"}
              message={"Preenche todos os campos"}
            />

            <Notification
              id={"shareButton"}
              type={"Success"}
              message={"Link copiado"}
            />

            <CookieWarning />

            <Analytics />
            <SpeedInsights />


        </StoreProvider>
      </body>
    </html>
  );
}
