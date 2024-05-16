import supabase from '@/utils/db/clients/public/supabase'

const getProductMaterials = async(id) => {
    const { data } = await supabase
    .from('products_has_materials')
    .select(`
        materials(
            name
        )
    `)
    .eq('id_product', id)

    const transformedData = data.map(item => item.materials.name);
    return transformedData
}

export default getProductMaterials