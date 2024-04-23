import supabase from '@/utils/db/clients/public/supabase'

const getAllMaterials = async() => {
    const { data } = await supabase
    .from('materials')
    .select()

    return data
}

export default getAllMaterials