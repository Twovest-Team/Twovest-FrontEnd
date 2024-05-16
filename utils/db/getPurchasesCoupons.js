import supabase from '@/utils/db/clients/public/supabase';
import getCouponById from "./getCouponById";

export default async function getPurchasesCoupons(id_purchase) {
  try {
    const { data: purchaseCouponData, error: purchaseCouponError } =
      await supabase
        .from("purchases_has_coupons")
        .select(
          `
                id_purchase,
                created_at,
                id_coupon
            `
        )
        .eq("id_purchase", id_purchase);

    if (purchaseCouponError) throw purchaseCouponError;

    if (purchaseCouponData && purchaseCouponData.length > 0) {
      let completePurchaseCouponData;

      completePurchaseCouponData = await Promise.all(
        purchaseCouponData.map(async (element) => {
          let purchaseCouponArray = element;
          let couponId = purchaseCouponArray.id_coupon;

          const couponDetailsData = await getCouponById(couponId);

          purchaseCouponArray.couponDetails = couponDetailsData;
          return purchaseCouponArray;
        })
      );

      return completePurchaseCouponData;
    }

    return purchaseCouponData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
