import supabase from '@/utils/db/clients/public/supabase'

const getCollectionData = async (collectionId) => {

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
                owner_data:users(
                  id,
                  name,
                  img
                )
              )
            ),
          members:collections_has_users(
            is_admin,
            users_data: users(
              id,
              name,
              email,
              img
            )
          )
        `
      )
      .eq('id', collectionId)
      .single()

      function transformCollection(collection) {
            return {
                id: collection.id,
                created_at: collection.created_at,
                updated_at: collection.updated_at,
                name: collection.name,
                privacy: collection.privacy,
                share_id: collection.share_id,
                looks: collection.looks.map(look => ({
                    created_at: look.created_at,
                    id: look.looks_data.id,
                    url_image: look.looks_data.url_image,
                    gender: look.looks_data.gender,
                    owner: {
                      id: look.looks_data.owner_data.id,
                      name: look.looks_data.owner_data.name,
                      email: look.looks_data.owner_data.email,
                      img: look.looks_data.owner_data.img
                    }
                    // gender: look.looks_data.gender,
                })),
                members: collection.members.map(member => (
                  {
                    is_admin: member.is_admin,
                    id: member.users_data.id,
                    img: member.users_data.img,
                    name: member.users_data.name,
                    email: member.users_data.email,
                  }
                ))
            };
    }

    if(error) console.log(error)
    return transformCollection(data)

  } catch (error) {
    console.log(error)
    return { error }
  }


}

export default getCollectionData