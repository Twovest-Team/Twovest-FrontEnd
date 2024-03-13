import { supabase } from '@/utils/db/supabase'
import getProductImages from '../getProductImages'

export default async function getUserCartProducts(email) {

    const { data, error } = await supabase
        .from('cart')
        .select(`
        id,
    offers (
        id,
        products(
            id,
            brands (
                name
            ),
            categories (
                id
            ),
            is_sustainable,
            discount,
            gender
        ),
        colors (
            name
        ),
        conditions (
            id,
            name
        ),
        sizes (
            size
        ),
        price,
        qty
    ),
    qty,
    created_at
    `)
        .eq('email', email)
        .order('created_at', { ascending: true })

    if (data) {

        let arrayOfProducts = await Promise.all(
            data.map(async (element) => {

                let array = element
                const images = await getProductImages(element.offers.products.id)

                array.offers.images = images

                return array
            }))

        return arrayOfProducts


    } else if (error) {
        console.log(error)
    }


}