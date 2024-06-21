import supabase from "@/utils/db/clients/public/supabase";

const getUsersForCollectionCard = async (id_collection, id_user) => {
  try {
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
      .neq("id_user", id_user)
      .order("created_at", { ascending: false });

    if (data) return data;
    if (error) throw error;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getUsersForCollectionCard;
