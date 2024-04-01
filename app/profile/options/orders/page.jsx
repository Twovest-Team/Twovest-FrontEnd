"use client";
import getUserOrders from "@/utils/db/getUserOrders";
import getOfferDetailsByOfferId from "@/utils/db/getOfferDetailsByOfferId";
import getPurchasesCoupons from "@/utils/db/getPurchasesCoupons";
import NavigationTitle from "@/components/providers/NavigationTitle";
import FiltersPurchaseHistory from "@/components/sliders/FiltersPurchaseHistory";

import PurchaseList from "@/components/sections/PurchaseList";
// Isto é a página "Histórico de Compras"
// twovest.com/options/orders
export default function Orders({ searchParams }) {
  //const ordersData = await getUserOrders(82);
  //const offerData = await getOfferDetailsByOfferId(604);
  //const couponsData = await getPurchasesCoupons(4);
  const type = searchParams.type;

  //console.log(ordersData);
  return (
    <main>
      <NavigationTitle titleText={"Histórico de compras"} />
      <FiltersPurchaseHistory currentCategory={type} />
      {/* Aqui vai entrar o componente já criado Purchase List, com a lista de encomendas.
      Atualmente está a dar um erro a buscar o utilizador atual */}
    </main>
  );
}
