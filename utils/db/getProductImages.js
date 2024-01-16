import { supabase } from '@/utils/db/supabase'

const getProductImages = async(id) => {
    const { data } = await supabase
    .from('images')
    .select(`
        id,
        url,
        alt
    `)
    .eq('id_product', id)
    
    return data
}

export default getProductImages