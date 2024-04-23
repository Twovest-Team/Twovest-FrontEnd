import supabase from '@/utils/db/clients/public/supabase'

const getProductImages = async(id) => {
    const { data } = await supabase
    .from('products_has_images')
    .select(`
        id,
        url,
        alt
    `)
    .eq('id_product', id)
    
    return data
}

export default getProductImages