import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import addToCollection from "./addToCollection";
import addUserToCollection from "./addUserToCollection";
import { v4 as uuidv4 } from 'uuid';

const createCollection = async (collectionName, privacy, lookId, userId, isAdmin) => {
    try {
        const supabase = createClientComponentClient();

        const { data: newCollectionData, error: collectionError } = await supabase
            .from('collections')
            .insert([
                { name: collectionName, privacy: privacy, share_id: uuidv4() },
            ])
            .select()
            .single()

        if (collectionError) throw collectionError

        const { data: handleSaveData, error: handleSaveError } = await handleSave(newCollectionData, lookId)
        if (handleSaveError || !handleSaveData) throw handleSaveError

        const { data: completeCollectionData, error: handleAssociationError } = await handleAssociation(newCollectionData, userId, isAdmin)

        if (handleAssociationError) throw handleAssociationError
        
        if(completeCollectionData) return completeCollectionData

    } catch (error) {
        console.log(error)
        return {error}
    }
}

async function handleSave(collectionData, lookId) {
    const { data, error } = await addToCollection(collectionData.id, lookId)
    if (error) return { error }
    if(data) return {data: data || null}
}

async function handleAssociation(collectionData, userId, isAdmin) {
    const { data, error } = await addUserToCollection(collectionData.id, userId, isAdmin)
    if (error) return { error }
    if(data) return {data: data || null}
}


export default createCollection 
