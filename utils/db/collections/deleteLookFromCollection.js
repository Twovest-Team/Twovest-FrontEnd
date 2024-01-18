import { supabase } from "../supabase";

export default async function deleteLookFromCollection(collectionId, lookId) {

    const { error } = await supabase
        .from('collections_has_looks')
        .delete()
        .eq('id_look', parseInt(lookId))
        .eq('id_collection', parseInt(collectionId))

    if (error) {
        console.log(error)
    }

}
