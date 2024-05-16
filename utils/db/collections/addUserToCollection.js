'use server'

import supabase from "../clients/admin/supabase";

const addUserToCollection = async (collectionId, userId, isAdmin) => {
    
    const { status, error } = await supabase
        .from('collections_has_users')
        .insert({ id_collection: collectionId, id_user: userId, is_admin: isAdmin })
        .select()

    if (status === 201){
        return true
    }else{
        console.log(error)
        return false
    }
    

}

export default addUserToCollection 
