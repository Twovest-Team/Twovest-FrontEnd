import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function updateCollectionPrivacy(collectionId, privacyValue) {

    const supabase = createClientComponentClient();

    if(privacyValue === 1 || privacyValue === 2){
        const {status, error} = await supabase
        .from('collections')
        .update({privacy: privacyValue})
        .eq('id', collectionId)

        if(error) return {error}
        if (status === 204){
            return true
        }else{
            return false
        }
    }

    
}