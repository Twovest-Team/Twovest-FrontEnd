'use server'

import supabase from "../clients/admin/supabase";

const addToCollection = async (collectionId, lookId, userId) => {

    const { status, error } = await supabase
        .from('collections_has_looks')
        .insert({ id_collection: collectionId, id_look: lookId, id_user: userId })
    
    if (status === 201){
        return true
    }else{
        console.log(error)
        return false
    }
       

}

export default addToCollection 
