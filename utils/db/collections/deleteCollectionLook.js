import { supabase } from "../supabase";

export default async function deleteCollectionLook(collectionId, lookId) {

    const { status, error } = await supabase
        .from('collections_has_looks')
        .delete()
        .eq('id_look', parseInt(lookId))
        .eq('id_collection', parseInt(collectionId))

    if (error) return {error}
    
    if (status === 204){
        return true
    }else{
        return false
    }

}
