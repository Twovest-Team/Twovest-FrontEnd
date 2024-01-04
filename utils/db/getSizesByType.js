import { supabase } from '@/utils/db/supabase'

const getSizesByType = async(type) => {
    const { data } = await supabase
    .from('sizes')
    .select()
    .eq('type', type)

    console.log(data)

    return data
}

export default getSizesByType