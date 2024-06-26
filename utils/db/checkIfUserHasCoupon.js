import supabase from "@/utils/db/clients/public/supabase";

export default async function checkIfUserHasCoupon(id_user, id_coupon) {
  try {
    const { data: checkCouponData, error: checkCouponError } = await supabase
      .from("users_has_coupons")
      .select(
        `
                *,
                coupons(
                discount,
                cost,
                coupons_has_brands(
                id_brand
                )
                )
            `
      )
      .eq("id_user", id_user)
      .eq("id_coupon", id_coupon);

    if (checkCouponError) throw checkCouponError;

    return checkCouponData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
