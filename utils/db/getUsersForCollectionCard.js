import { supabase } from "@/utils/db/supabase";

const getUsersForCollectionCard = async (id_collection,id_user) => {
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
    .eq("id_collection", id_collection)
    .neq('id_user', id_user)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getUsersForCollectionCard;