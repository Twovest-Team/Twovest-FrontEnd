import { supabase } from '@/utils/db/supabase'
import getProductImages from '../getProductImages'

export default async function getUserHistory(userEmail) {

    const { data, error } = await supabase
        .from('last_products_seen')
        .select(`
        products (
            id,
            is_sustainable,
            gender,
            discount,
            brands (
                logo_url,
                name
            ),
            categories (
                id
            )
        )
        `)
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false })

    if (data) {
        let arrayOfProducts = await Promise.all(
            data.map(async (element) => {
                
                let array = element
                const images = await getProductImages(element.products.id)

                array.products.images = images

                return array
            }))

        return arrayOfProducts

    } else if (error) {
        console.log(error)
    }

}
