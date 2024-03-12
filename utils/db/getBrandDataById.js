import { supabase } from "@/utils/db/supabase";

export default async function getBrandDataById(brandId) {
  try {
    const { data: brandData, error: brandError } = await supabase
      .from("brands")
      .select("*")
      .eq("id", brandId);

    if (brandError) throw brandError;

    if (brandData && brandData.length > 0) {
      return brandData[0];
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
