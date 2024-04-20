import getUserOrders from "@/utils/db/getUserOrders";
import getOfferDetailsByOfferId from "@/utils/db/getOfferDetailsByOfferId";
import getPurchasesCoupons from "@/utils/db/getPurchasesCoupons";
import NavigationTitle from "@/components/providers/NavigationTitle";
import FiltersPurchaseHistory from "@/components/sliders/FiltersPurchaseHistory";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import PurchaseList from "@/components/sections/PurchaseList";
import getUserById from "@/utils/db/getUserById";
// Isto é a página "Histórico de Compras"
// twovest.com/options/orders
export default async function Orders({ searchParams }) {
 
  const currentUser = await useAuthServer();
  
 
  //const ordersData = await getUserOrders(82);
  //const offerData = await getOfferDetailsByOfferId(604);
  //const couponsData = await getPurchasesCoupons(4);
  const type = searchParams.type;

  //console.log(ordersData);
  return (
    <main>
      <NavigationTitle titleText={"Histórico de compras"} />
      <FiltersPurchaseHistory currentCategory={type} />
      <PurchaseList type={type} user={currentUser}/>
    </main>
  );
}
