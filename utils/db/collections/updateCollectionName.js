import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function updateCollectionName(collectionId, newName) {

    const supabase = createClientComponentClient();

    if(newName.trim().length > 0){
        const {status, error} = await supabase
        .from('collections')
        .update({name: newName})
        .eq('id', collectionId)

        if(error) return {error}
        if (status === 204){
            return true
        }else{
            return false
        }
    }

    
}