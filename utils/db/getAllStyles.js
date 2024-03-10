import { supabase } from '@/utils/db/supabase'

const getAllStyles = async() => {
    const { data } = await supabase
    .from('styles')
    .select()

    return data
}

export default getAllStyles