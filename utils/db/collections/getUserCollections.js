import { supabase } from '@/utils/db/supabase'
import getUsersForCollectionCard from '../getUsersForCollectionCard';
import getLookForCollectionCard from '../getLookForCollectionCard';


const getUserCollections = async (userId) => {
    const { data, error } = await supabase
        .from('collections_has_users')
        .select(`
        is_admin,
    collections (
        id,
        name,
        privacy
    )
    `)
        .eq('id_user', userId);

    if (data && data.length > 0) {

        let transformedData = await Promise.all(
            data.map(async (element) => {
                let array = element;
                const looks = await getLookForCollectionCard(element.collections.id);
                const users = await getUsersForCollectionCard(
                    element.collections.id,
                    userId
                );
                array.looks = looks;
                array.users = users;

                return array;
            })
        );

        if (transformedData) {
            return transformedData;
        }


        return data
    } else if (error) {
        console.log(error)
    }

    console.log(data)




}

export default getUserCollections