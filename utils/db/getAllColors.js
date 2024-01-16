import { supabase } from '@/utils/db/supabase'

const getAllColors = async() => {
    const { data } = await supabase
    .from('colors')
    .select()

    return data
}

export default getAllColors