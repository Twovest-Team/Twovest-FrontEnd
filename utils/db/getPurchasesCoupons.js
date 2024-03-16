import { supabase } from "@/utils/db/supabase";

export default async function getPurchasesCoupons(id_purchase) {
  try {
    const { data: purchaseCouponData, error: purchaseCouponError } =
      await supabase
        .from("purchases_has_coupons")
        .select(
          `
                *
            `
        )
        .eq("id_purchase", id_purchase);

    if (purchaseCouponError) throw purchaseCouponError;

    return purchaseCouponData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
