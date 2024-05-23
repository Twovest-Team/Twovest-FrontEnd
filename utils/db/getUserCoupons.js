import supabase from "@/utils/db/clients/public/supabase";

export default async function getUserCoupons(userId) {
  try {
    const { data: couponData, error: couponError } = await supabase
      .from("users_has_coupons")
      .select(
        `
            id_coupon,
            id_user,
            created_at,
            quantity,
            coupons(
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
            )
          `
      )
      .eq("id_user", userId);

    if (couponError) throw couponError;
    if (couponData) return couponData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
