import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import saveLookToCollection from "./saveLookToCollection";
import associateUserToCollection from "./associateUserToCollection";

const createCollection = async (collectionName, privacy, lookId, userId, isAdmin) => {
    const supabase = createClientComponentClient();


    const { data, error } = await supabase
        .from('collections')
        .insert([
            { name: collectionName, privacy: privacy },
        ])
        .select()


    if (error) {
        console.log(error)
    }else if (data){
        const lookData = await saveLookToCollection(data[0].id, lookId)
        if(lookData){
            const result =  await associateUserToCollection(data[0].id, userId, isAdmin)
            if(result){
                return result
            }

        }
    }

}

export default createCollection 
