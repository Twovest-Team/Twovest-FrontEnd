import { supabase } from "@/utils/db/supabase";

export default async function updateUserCouponQuantity(
  id_user,
  id_coupon,
  newQuantity
) {
  try {
    const { updateQuantityData, updateQuantityError } = await supabase
      .from("users_has_coupons")
      .update({ quantity: newQuantity })
      .eq("id_user", id_user, "id_coupon", id_coupon);

    if (updateQuantityError) throw updateQuantityError;

    return "Atualização de quantidade efetuada com sucesso";
  } catch (error) {
    console.log(error);
    return { error };
  }
}
