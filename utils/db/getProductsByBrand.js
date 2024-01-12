import { supabase } from '@/utils/db/supabase';
import getProductImages from './getProductImages';
import getProcuctOffers from './getProductOffers';
import getProductMaterials from './getProductMaterials';
import getProductStyles from './getProductStyles';
import capitalizeFirstLetter from '../capitalizeFirstLetter';

const getProductByBrand = async (gender, brandId) => {
  gender = capitalizeFirstLetter(gender);

  const { data } = await supabase
    .from('products')
    .select(`
    id,
    reference,
    is_sustainable,
    views,
    gender,
    name,
    discount,
    brands (
        id,
        logo_url,
        name
    ),
    images (
        id,
        url,
        id_product,
        alt
    
    )
`)
    .eq('gender', gender)
    .eq('brands.id', brandId)
    .eq('is_public', true);

    if (data && data.length > 0) {
      const images = await getProductImages(data[0].id);
      const offers = await getProcuctOffers(data[0].id);
      const materials = await getProductMaterials(data[0].id);
      const styles = await getProductStyles(data[0].id);
    
      data.images = images;
      data.offers = offers;
      data.materials = materials;
      data.styles = styles;
    } else {
    
      console.error('Nenhum dado encontrado para o gender e brandId.');
     
    }

    
  

  return data;
};

export default getProductByBrand;