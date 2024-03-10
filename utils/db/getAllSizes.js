import { supabase } from '@/utils/db/supabase'

const getAllSizes = async() => {
    const { data } = await supabase
    .from('sizes')
    .select()


    return data
}

export default getAllSizes