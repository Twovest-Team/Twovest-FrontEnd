import { supabase } from "../supabase";
import deleteCollection from "./deleteCollection";

export default async function deleteCollectionUser(collectionId, userId) {

    const { status, error } = await supabase
        .from('collections_has_users')
        .delete()
        .eq('id_user', parseInt(userId))
        .eq('id_collection', parseInt(collectionId))

    if (error) return {error}
    
    if (status === 204){
        
        return true
        // Determinar o que acontece se for admin e sair da coleção.
        
    }else{
        return false
    }

}