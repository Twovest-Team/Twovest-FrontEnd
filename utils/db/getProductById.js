import { supabase } from '@/utils/db/supabase';
import getProductImages from './getProductImages';
import getProcuctOffers from './getProductOffers';
import getProductMaterials from './getProductMaterials';
import getProductStyles from './getProductStyles';
import capitalizeFirstLetter from '../capitalizeFirstLetter';

const getProductById = async (id, gender) => {

    gender = capitalizeFirstLetter(gender) // Necessário visto que na bd os géneros estão em maiuscula

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
            logo_url,
            name
        ),
        categories (
            id,
            main_category
        )
    `)
        .eq('id', id)
        .eq('gender', gender)
        .eq('is_public', true)

        const images = await getProductImages(data[0].id)
        const offers = await getProcuctOffers(data[0].id)
        const materials = await getProductMaterials(data[0].id)
        const styles = await getProductStyles(data[0].id)

        data[0].images = images
        data[0].offers = offers
        data[0].materials = materials
        data[0].styles = styles

    
    return data[0]
}

export default getProductById
