import supabase from '@/utils/db/clients/public/supabase';
import getPurchasesOffers from "./getPurchasesOffers";
import getPurchasesCoupons from "./getPurchasesCoupons";

export default async function getUserOrders(id_user) {
  try {
    const { data: ordersData, error: ordersError } = await supabase
      .from("purchases")
      .select(
        `
            *
        `
      )
      .eq("id_user", id_user);

    if (ordersError) throw ordersError;

    if (ordersData && ordersData.length > 0) {
      let completeOrdersData;

      completeOrdersData = await Promise.all(
        ordersData.map(async (element) => {
          let orderArray = element;
          let orderId = orderArray.id;

          const purchasesOffers = await getPurchasesOffers(orderId);
          const purchasesCoupons = await getPurchasesCoupons(orderId);

          orderArray.offers = purchasesOffers;
          orderArray.coupons = purchasesCoupons;
          return orderArray;
        })
      );

      return completeOrdersData;
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
