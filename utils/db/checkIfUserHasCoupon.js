import { supabase } from "@/utils/db/supabase";

export default async function checkIfUserHasCoupon(id_user, id_coupon) {
  try {
    const { data: checkCouponData, error: checkCouponError } = await supabase
      .from("users_has_coupons")
      .select(
        `
                *
            `
      )
      .eq("id_user", id_user, "id_coupon",id_coupon);

    if (checkCouponError) throw checkCouponError;

    return checkCouponData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
