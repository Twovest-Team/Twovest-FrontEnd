import supabase from '@/utils/db/clients/public/supabase'

const getProductStyles = async(id) => {
    const { data } = await supabase
    .from('products_has_styles')
    .select(`
        styles(
            name
        )
    `)
    .eq('id_product', id)
    
    let transformedData = [];
    data.map(object => transformedData.push(object.styles.name))
    
    return transformedData
}

export default getProductStyles