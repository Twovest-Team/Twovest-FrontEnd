import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const deleteCollection = async (collectionId) => {

    const supabase = createClientComponentClient();

    const {status, error} = await supabase
        .from('collections')
        .delete()
        .eq('id', collectionId)

    if(error) return {error}
    
    if (status === 204){
        return true
    }else{
        return false
    }

}


















export default deleteCollection