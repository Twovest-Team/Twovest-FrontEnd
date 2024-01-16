import { supabase } from '@/utils/db/supabase';
import getProductImages from './getProductImages';
import getProcuctOffers from './getProductOffers';
import getProductMaterials from './getProductMaterials';
import getProductStyles from './getProductStyles';

const getProductsByCategory = async (id_category ,gender) => {
    const { data } = await supabase
        .from('products')
        .select(`
        id,
        is_sustainable,
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
        .eq('id_category', id_category)
        .eq('is_public', true)
        .eq ('gender', gender)


    let arrayOfProducts = await Promise.all(
    data.map(async(element) => {
        
        let array = element
        const images = await getProductImages(element.id)
        const offers = await getProcuctOffers(element.id)
        const materials = await getProductMaterials(element.id)
        const styles = await getProductStyles(element.id)

        array.images = images
        array.offers = offers
        array.materials = materials
        array.styles = styles

        return array
    }))

    return arrayOfProducts
}

export default getProductsByCategory
