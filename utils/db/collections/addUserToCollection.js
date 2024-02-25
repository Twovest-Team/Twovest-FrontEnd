import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const addUserToCollection = async (collectionId, userId, isAdmin) => {

    const supabase = createClientComponentClient();
    
    const { status, error } = await supabase
        .from('collections_has_users')
        .insert({ id_collection: collectionId, id_user: userId, is_admin: isAdmin })
        .select()

    if(error) return {error}
    if (status === 201){
        return true
    }else{
        return false
    }
    

}

export default addUserToCollection 
