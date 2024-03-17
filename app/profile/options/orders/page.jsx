import getUserOrders from "@/utils/db/getUserOrders";
import getOfferDetailsByOfferId from "@/utils/db/getOfferDetailsByOfferId";
import getPurchasesCoupons from "@/utils/db/getPurchasesCoupons";
// Isto é a página "Histórico de Compras"
// twovest.com/options/orders
export default async function Orders() {
  //const ordersData = await getUserOrders(82);
  //const offerData = await getOfferDetailsByOfferId(604);
  //const couponsData = await getPurchasesCoupons(4);

  //console.log(ordersData);
  return <div className="h-[2600px] w-full">Orders</div>;
}
