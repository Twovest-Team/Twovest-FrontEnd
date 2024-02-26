import { supabase } from "@/utils/db/supabase";

const getCollectionMembers = async (collectionId, userId) => {
  const { data, error } = await supabase
    .from("collections_has_users")
    .select(
      `
    id_user,
    is_admin,
    users(
        name,
        img
    )
`
    )
    .eq("id_collection", collectionId)
    .eq('id_user', userId)
    .order("created_at", { ascending: false });

  if(error) return {error}
  if(data) return {data}
};

export default getCollectionMembers;
