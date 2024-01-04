import { supabase } from '@/utils/db/supabase'

const getAllColors = async() => {
    const { data } = await supabase
    .from('colors')
    .select()

    console.log(data)

    return data
}

export default getAllColors