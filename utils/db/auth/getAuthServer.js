import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getAuthServer() {
  
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const userData = await supabase.auth.getUser();

    if (!userData) return null

    const email = userData?.data.user?.user_metadata?.email;

    if(!email) return null

    const { data, error } = await supabase
      .from("users")
      .select(`
        id,
        email,
        name,
        created_at,
        img,
        role,
        points,
        looks (
          id,
          url_image,
          upvotes,
          gender,
          users(
            name,
            id,
            img
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
                  img
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
      .eq("email", email)
      .single();

    if (!data || error) return null

    function transformUserObject(user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        img: user.img,
        role: user.role,
        points: user.points,
        looks: user.looks,
        collections: user.collections.map(collection => {
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
  
}
