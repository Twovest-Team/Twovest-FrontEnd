import supabase from '@/utils/db/clients/public/supabase'

const getSizesByType = async(type) => {
    const { data } = await supabase
    .from('sizes')
    .select()
    .eq('type', type)


    return data
}

export default getSizesByType