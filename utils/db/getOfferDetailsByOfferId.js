import { supabase } from "@/utils/db/supabase";
import getProductImages from "./getProductImages";

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
                  id,
                  reference,
                  is_sustainable,
                  views,
                  gender,
                  name,
                  discount,
                  brands (
                      logo_url,
                      name
                  ),
                  categories (
                      id,
                      main_category
                  )
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

    if (OfferData && OfferData.length > 0) {
      const images = await getProductImages(OfferData[0].products.id);

      OfferData[0].products.images = images;
    }

    if (OfferError) throw OfferError;

    return OfferData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
