import supabase from "@/utils/db/clients/public/supabase";

export default async function checkIfCouponApplies(id_brand, id_coupon) {
    try {
        const { data: checkCouponData, error: checkCouponError } = await supabase
          .from("coupons_has_brands")
          .select(
            `
                    id_brand,
                    id_coupon,
                    coupons(
                    discount
                    )
                `
          )
          .eq("id_brand", id_brand)
          .eq("id_coupon", id_coupon);
    
        if (checkCouponError) throw checkCouponError;
    
        return checkCouponData;
      } catch (error) {
        console.log(error);
        return { error };
      }
}