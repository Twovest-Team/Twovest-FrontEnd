import { supabase } from "@/utils/db/supabase";
import getProductImages from "./getProductImages";
import getProductOffers from "./getProductOffers";
import getProductMaterials from "./getProductMaterials";
import getProductStyles from "./getProductStyles";
import getGender from "../getGender";

const getProductById = async (id, gender) => {

  const genderId = getGender(gender); 
console.log(genderId);
  const { data, error } = await supabase
    .from('products')
    .select(
      `
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
    `
    )
    .eq('id', id)
    .eq('gender', genderId)
    .eq('is_public', true)
  
 

  
    if (data && data.length > 0) {
      const images = await getProductImages(data[0].id);
      const offers = await getProductOffers(data[0].id);
      const materials = await getProductMaterials(data[0].id)
      const styles = await getProductStyles(data[0].id);
    
      data.images = images;
      data.offers = offers;
      data.materials = materials;
      data. styles = styles;
      
    } else {
    
      console.log(error);
     
    }
};

export default getProductById;
