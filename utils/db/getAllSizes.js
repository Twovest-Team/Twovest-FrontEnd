import supabase from '@/utils/db/clients/public/supabase'

const getAllSizes = async() => {
    const { data } = await supabase
    .from('sizes')
    .select()


    return data
}

export default getAllSizes