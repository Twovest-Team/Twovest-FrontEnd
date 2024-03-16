import { supabase } from "@/utils/db/supabase";

export default async function getPurchasesOffers(id_purchase) {
  try {
    const { data: purchaseOfferData, error: purchaseOfferError } =
      await supabase
        .from("purchases_has_offers")
        .select(
          `
                *
            `
        )
        .eq("id_purchase", id_purchase);

    if (purchaseOfferError) throw purchaseOfferError;

    return purchaseOfferData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
