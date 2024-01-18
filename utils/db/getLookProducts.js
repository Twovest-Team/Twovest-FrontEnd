import { supabase } from "@/utils/db/supabase";
import getProductById from "./getProductById";

const getLookProducts = async (id, gender) => {
  const { data, error } = await supabase
    .from("looks_has_products")
    .select(
      `
        id_product
    `
    )
    .eq("id_look", id);

  let transformedData = await Promise.all(
    
    data.map(async (object) => {
      let productDetails = await getProductById(object.id_product, gender);

      if(productDetails){
        return productDetails;
      }
    })

  );

  transformedData = transformedData.filter((element) => element !== undefined);

  if (transformedData.length > 0) {
    return transformedData;
  } else if(error) {
    console.log(error)
  }
};

export default getLookProducts;
