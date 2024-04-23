import supabase from '@/utils/db/clients/public/supabase'

const getAllConditions = async() => {
    const { data } = await supabase
    .from('conditions')
    .select()


    return data
}

export default getAllConditions