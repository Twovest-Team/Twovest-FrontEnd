import supabase from "@/utils/db/clients/public/supabase";

export default async function getCouponById(id_coupon) {
  //
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
            is_special,
            coupons_has_brands(
              brands(
                *
              )
            )
        `
      )
      .eq("id", id_coupon);

    function transformCouponsObject(couponsArray) {
      return couponsArray.map((coupon) => {
        const brands = coupon.coupons_has_brands.map((item) => item.brands);
        const { coupons_has_brands, ...rest } = coupon;
        return {
          ...rest,
          brands,
        };
      });
    }

    if (couponError) throw couponError;
    if (couponData) return transformCouponsObject(couponData);
  } catch (error) {
    console.log(error);
    return { error };
  }
}
