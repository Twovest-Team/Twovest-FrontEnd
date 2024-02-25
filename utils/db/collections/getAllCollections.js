import { supabase } from '@/utils/db/supabase'
import getCollectionMembers from './getCollectionMembers';
import getCollectionLooks from './getCollectionLooks';


const getAllCollections = async (userId) => {

    try {
        const { data: collectionData, error: collectionError } = await supabase
        .from('collections_has_users')
        .select(`
            is_admin,
            id_collection,
            collections (
                id,
                name,
                privacy
            )
        `)
        .eq('id_user', userId);
    
        if(collectionError) throw collectionError

        if(collectionData && collectionData.length > 0){

            let completeCollectionData;

            completeCollectionData = await Promise.all(
                collectionData.map(async (element) => {
                    let collectionArray = element
                    let collectionId = collectionArray.collections.id;

                    const {data: looksData, error: looksError} = await getCollectionLooks(collectionId);
                    if(looksError) throw looksError

                    const {data: membersData, error: membersError} = await getCollectionMembers(collectionId, userId)
                    if(membersError) throw membersError

                    collectionArray.looks = looksData
                    collectionArray.users = membersData

                    return collectionArray
                })
            )

            return completeCollectionData

        }

    } catch (error) {
        console.log(error)
        return {error}
    }


}

export default getAllCollections