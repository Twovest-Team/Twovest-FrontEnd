import { supabase } from '@/utils/db/supabase';
import getProductImages from './getProductImages';
import getProductOffers from './getProductOffers';
import getProductMaterials from './getProductMaterials';
import getProductStyles from './getProductStyles';
import capitalizeFirstLetter from '../capitalizeFirstLetter';

const getProductByBrand = async (gender, brandName) => {
  gender = capitalizeFirstLetter(gender);
  console.log(brandName)
  const { data, error } = await supabase
    .from('products')
    .select(`
    id,
    reference,
    is_sustainable,
    views,
    gender,
    name,
    discount,
    brands!inner (
        id,
        logo_url,
        name,
        cover_url
    ),
    images (
        id,
        url,
        id_product,
        alt
    ),
    offers (
        id_product, 
        id_color,
        id_size, 
        price 
    ), 
    categories (
      id,
      main_category
  )
`)
    .eq('gender', gender)
    .eq('is_public', true)
    .eq('brands.name', brandName)

    if (data && data.length > 0) {
      const images = await getProductImages(data[0].id);
      const offers = await getProductOffers(data[0].id);
      
    
      data.images = images;
      data.offers = offers;
      
    } else {
    
      console.log(error);
     
    }

    
  

  return data;
};

export default getProductByBrand;