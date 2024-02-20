import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const saveLookToCollection = async (collectionId, lookId) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
        .from('collections_has_looks')
        .insert({ id_collection: collectionId, id_look: lookId })
        .select()

    if(error){
        console.log(error)
    }else if(data){
        return data
    }

}

export default saveLookToCollection 
