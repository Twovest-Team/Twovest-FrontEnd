import supabase from '@/utils/db/clients/public/supabase';

const getCollections = async (ownerId, max = 100, privacy = null) => {

    try {
        const { data, error } = await supabase
            .from('collections')
            .select(
                `
        id,
        created_at,
        updated_at,
        name,
        privacy,
        share_id,
        looks:collections_has_looks(
            created_at,
            looks_data:looks(
                id,
                url_image,
                gender,
                owner: users(
                 id,
                 name,
                 img       
                )
            )
        ),
        members:collections_has_users!inner(
            created_at,
            members_data:users(
                id,
                name,
                img            
            )
        )
    `
            )
            .eq('collections_has_users.id_user', ownerId)
            .order("created_at", { ascending: false })
            .limit(max)


        function transformCollection(array) {
            return array.map(collection => {
                return {
                    id: collection.id,
                    created_at: collection.created_at,
                    updated_at: collection.updated_at,
                    name: collection.name,
                    privacy: collection.privacy,
                    share_id: collection.share_id,
                    looks: collection.looks.map(look => ({
                        id: look.looks_data.id,
                        gender: look.looks_data.gender,
                        url_image: look.looks_data.url_image,
                        owner: {
                            id: look.looks_data.owner.id,
                            img: look.looks_data.owner.img,
                            name: look.looks_data.owner.name,
                        }
                    })),
                    members: collection.members.map(member => ({
                        created_at: member.created_at,
                        id: member.members_data.id,
                        img: member.members_data.img,
                        name: member.members_data.name,
                    }))
                };
            });
        }

        

        console.log(error)
        return transformCollection(data)

    } catch (error) {
        console.log(error)
        return { error }
    }


}

export default getCollections