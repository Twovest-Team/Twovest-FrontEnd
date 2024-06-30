import supabase from "@/utils/db/clients/public/supabase";

const getUserById = async (id_user) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(`
        id,
        name,
        created_at,
        img,
        role,
        provider,
        points,
        looks (
          id,
          url_image,
          upvotes,
          gender,
          users(
            name,
            id,
            img,
            role,
            provider
          )
        ),
        collections:collections_has_users(
          id: id_collection,
          is_admin,
          collection_data: collections(
            created_at,
            updated_at,
            name,
            privacy,
            share_id,
            looks: collections_has_looks(
              id_look,
              look_data: looks (
                url_image,
                gender,
                owner_data:users(
                  id,
                  name,
                  img,
                  role,
                  provider
                ),
                styles(
                  id,
                  name
                )
              )
            )
          )
        )
      `)
      .eq("id", id_user)
      .eq("collections.collection_data.privacy", 2)
      .single();

    if (error) throw error
    if (!data || error) return null

    function transformUserObject(user) {
      return {
        id: user.id,
        name: user.name,
        created_at: user.created_at,
        img: user.img,
        role: user.role,
        points: user.points,
        looks: user.looks,
        collections: user.collections
          .filter(collection => collection.collection_data)
          .map(collection => {
            const { collection_data, ...rest } = collection;
            const { looks, ...collectionData } = collection_data;
            return {
              ...rest,
              ...collectionData,
              looks: looks.map(look => ({
                id: look.id_look,
                url_image: look.look_data.url_image,
                gender: look.look_data.gender,
                owner: {
                  id: look.look_data.owner_data.id,
                  name: look.look_data.owner_data.name,
                  img: look.look_data.owner_data.img,
                },
                styles: look.look_data.styles
              }))
            };
          })
      };
    }


    return transformUserObject(data);


  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getUserById;



