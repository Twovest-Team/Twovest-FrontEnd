import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getAuth() {

  const supabase = createClientComponentClient();

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
            id_collection,
            is_admin,
            collection_data: collections(
              created_at,
              updated_at,
              name,
              privacy,
              share_id,
              looks: collections_has_looks(
                id_look
              )
            )
          )
        `
      )
      .eq("email", email)
      .single();

      console.log(data)

    if (data) return data;
    if (error) console.log(error);
  }
}