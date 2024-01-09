import { supabase } from '@/utils/db/supabase'

const ManageAuthUsers = async({userData}) =>{
    const { data } = await supabase
    .from('users')
    .insert({name: userData.username, img: userData.img, email: userData.email})
    

    return data
}

export default ManageAuthUsers;