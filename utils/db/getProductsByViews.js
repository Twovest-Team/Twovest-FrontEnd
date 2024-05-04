import supabase from '@/utils/db/clients/public/supabase';
import getProductImages from './getProductImages';
import getProcuctOffers from './getProductOffers';
import getProductMaterials from './getProductMaterials';
import getProductStyles from './getProductStyles';
import getGender from '../getGender';

const getProductsByViews = async (gender) => {

    const genderId = getGender(gender).id

    const { data, error } = await supabase
        .from('products')
        .select(`
        id,
        is_sustainable,
        discount,
        gender,
        views,
        brands (
            logo_url,
            name
        ),
        categories (
            id,
            main_category
        )
    `)
        .eq('is_public', true)
        .eq('gender', genderId) 
        .order("views", { ascending: true })
        .limit(10)
 

        if(error){
            console.log(error)
        }
    let arrayOfProducts = await Promise.all(
    data.map(async(element) => {
        
        let array = element
        const products_has_images = await getProductImages(element.id)
        const offers = await getProcuctOffers(element.id)
        const materials = await getProductMaterials(element.id)
        const styles = await getProductStyles(element.id)

        array.products_has_images = products_has_images
        array.offers = offers
        array.materials = materials
        array.styles = styles

        return array
    }))

    return arrayOfProducts
}

export default getProductsByViews;