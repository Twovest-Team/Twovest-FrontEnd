import supabase from '@/utils/db/clients/public/supabase';
import getProductImages from './getProductImages';
import getProductOffers from './getProductOffers';
import getGender from '../getGender';

const getProductByBrand = async (gender, brandName) => {

  const genderId = getGender(gender).id

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
    .eq('gender', genderId)
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