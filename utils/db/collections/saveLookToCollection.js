import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const saveLookToCollection = async (collectionId, lookId) => {
    const supabase = createClientComponentClient();
    console.log('FAZ SAVE')
    const { error } = await supabase
        .from('collections_has_looks')
        .insert({ id_collection: collectionId, id_look: lookId })

    if(error){
        console.log(error)
    }

}

export default saveLookToCollection 
