import supabase from "@/utils/db/clients/public/supabase";

export default async function getAllCoupons(maximumCost,minimumCost) {
  try {
    const { data: couponData, error: couponError } = await supabase.from(
      "coupons"
    ).select(`
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
        `).lte('cost', maximumCost).gt('cost', minimumCost);

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
