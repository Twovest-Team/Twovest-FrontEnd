import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const addToCollection = async (collectionId, lookId, userId) => {

    const supabase = createClientComponentClient();

    const { status, error } = await supabase
        .from('collections_has_looks')
        .insert({ id_collection: collectionId, id_look: lookId, id_user: userId })

    if (status === 200){
        return true
    }else{
        console.log(error)
        return false
    }
       

}

export default addToCollection 
