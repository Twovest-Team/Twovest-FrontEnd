import supabase from '@/utils/db/clients/public/supabase';
import getCouponBrandsById from "./getCouponBrandsById";

export default async function getCouponById(id_coupon) {
  try {
    const { data: couponData, error: couponError } = await supabase
      .from("coupons")
      .select(
        `
            id,
            title,
            description,
            discount,
            cost,
            is_special
        `
      )
      .eq("id", id_coupon);

    if (couponError) throw couponError;

    if (couponData && couponData.length > 0) {
      let completeCouponData;

      completeCouponData = await Promise.all(
        couponData.map(async (element) => {
          let couponArray = element;
          let couponId = couponArray.id;

          const couponBrandsData = await getCouponBrandsById(couponId);

          couponArray.brands = couponBrandsData;
          return couponArray;
        })
      );

      return completeCouponData[0];
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
