import { supabase } from "@/utils/db/supabase";
import getOfferDetailsByOfferId from "./getOfferDetailsByOfferId";

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

    if (purchaseOfferData && purchaseOfferData.length > 0) {
      let completePurchaseOfferData;

      completePurchaseOfferData = await Promise.all(
        purchaseOfferData.map(async (element) => {
          let purchaseArray = element;
          let offerId = purchaseArray.id_offer;

          const offerDetails = await getOfferDetailsByOfferId(offerId);
          

          purchaseArray.offerDetails = offerDetails;
      
          return purchaseArray;
        })
      );

      return completePurchaseOfferData;
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
