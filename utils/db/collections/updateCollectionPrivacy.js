import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function updateCollectionPrivacy(collectionId, privacyValue) {

    const supabase = createClientComponentClient();

    if(privacyValue == 1 || privacyValue == 2){
        const {data, status, error} = await supabase
        .from('collections')
        .update({privacy: privacyValue})
        .eq('id', collectionId)
        .select()

        if(error) return {error}
        if (data && status === 200){
            return true
        }else{
            return false
        }
    }

    return false

    
}