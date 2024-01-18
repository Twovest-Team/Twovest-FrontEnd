import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const associateUserToCollection = async (collectionId, userId, isAdmin) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
        .from('collections_has_users')
        .insert({ id_collection: collectionId, id_user: userId, is_admin: isAdmin })
        .select()

    if(error){
        console.log(error)
    }else if(data){
        return data
    }

}

export default associateUserToCollection 
