import { supabase } from "@/utils/db/supabase";

const getCollectionLooks = async (collectionId) => {
  const { data, error } = await supabase
    .from("collections_has_looks")
    .select(
      `
      id_look,
      created_at,
      looks(
          id,
          url_image,
          upvotes,
          users (
            id,
            name,
            img
          )
      )
`
    )
    .eq("id_collection", collectionId)
    .order("created_at", { ascending: false });

  if (error) return {error}
  if (data) return {data}

};

export default getCollectionLooks;
