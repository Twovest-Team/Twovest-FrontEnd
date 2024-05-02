import supabase from '@/utils/db/clients/public/supabase';
import getProductById from "./getProductById";
import getGender from "../getGender";

const getLookProducts = async (id, gender) => {
  
  const genderId = getGender(gender).id

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
      let productDetails = await getProductById(object.id_product, genderId);

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
