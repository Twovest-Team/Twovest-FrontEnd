import { supabase } from '@/utils/db/supabase'

const getAllMaterials = async() => {
    const { data } = await supabase
    .from('materials')
    .select()

    console.log(data)

    return data
}

export default getAllMaterials