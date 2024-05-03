import supabase from '@/utils/db/clients/public/supabase';
import getBrandDataById from "./getBrandDataById";

export default async function getCouponBrandsById(couponId) {
  try {
    const { data: couponBrandData, error: couponBrandError } = await supabase
      .from("coupons_has_brands")
      .select(
        `
            id_brand
        `
      )
      .eq("id_coupon", couponId);

    if (couponBrandError) throw couponBrandError;

    if (couponBrandData && couponBrandData.length > 0) {
      let completeCouponBrandData;

      completeCouponBrandData = await Promise.all(
        couponBrandData.map(async (element) => {
          let couponBrandArray = element;

          let couponBrandId = couponBrandArray.id_brand;

          const couponBrandsData = await getBrandDataById(couponBrandId);

          couponBrandArray.brandData = couponBrandsData;

          return couponBrandArray;
        })
      );

      return completeCouponBrandData;
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
