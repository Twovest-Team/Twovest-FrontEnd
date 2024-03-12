import { supabase } from "@/utils/db/supabase";
import getCouponBrandsById from "./getCouponBrandsById";

export default async function getAllCoupons() {
  try {
    const { data: couponData, error: couponError } = await supabase.from(
      "coupons"
    ).select(`
            id,
            title,
            description,
            discount,
            cost,
            is_special
        `);

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

      return completeCouponData;
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
