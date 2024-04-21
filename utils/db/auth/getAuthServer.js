import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getAuthServer() {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const userData = await supabase.auth.getUser();
    const email = userData?.data?.user?.user_metadata?.email;

    if (email) {
        const { data, error } = await supabase
          .from("users")
          .select(
            `
              id,
              email,
              name,
              created_at,
              img,
              role,
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
                      url_image
                    )
                  )
                )
              )
            `
          )
          .eq("email", email)
          .single();
    
    
        if (data) {
          function transformUserObject(user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              created_at: user.created_at,
              img: user.img,
              role: user.role,
              collections: user.collections.map(collection => {
                const { collection_data, ...rest } = collection;
                const { looks, ...collectionData } = collection_data;
                return {
                  ...rest,
                  ...collectionData,
                  looks: looks.map(look => ({
                    id: look.id_look,
                    url_image: look.look_data.url_image
                  }))
                };
              })
            };
          }
    
          return transformUserObject(data);
        }
        if (error) console.log(error);
      }
}