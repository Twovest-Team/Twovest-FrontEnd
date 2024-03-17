import { supabase } from "@/utils/db/supabase";

export default async function getOfferDetailsByOfferId(id_offer) {
  try {
    const { data: OfferData, error: OfferError } = await supabase
      .from("offers")
      .select(
        `
                *,
                colors (
                    name
                ),
                products(
                    *
                ),
                sizes (
                    size,
                    type
                ),
                conditions (
                    name
                )
            `
      )
      .eq("id", id_offer);

    if (OfferError) throw OfferError;

    return OfferData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
