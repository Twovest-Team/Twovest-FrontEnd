import getUserOrders from "@/utils/db/getUserOrders";
// Isto é a página "Histórico de Compras"
// twovest.com/options/orders
export default async function Orders() {
  const ordersData = await getUserOrders(82);

  console.log(ordersData[1].offers);
  return <div className="h-[2600px] w-full">Orders</div>;
}
