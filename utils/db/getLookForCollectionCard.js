import { supabase } from "@/utils/db/supabase";

const getLookForCollectionCard = async (id_collection) => {
  const { data, error } = await supabase
    .from("collections_has_looks")
    .select(
      `
    id_look,
    created_at,
    looks(
        id,
        url_image
    )
`
    )
    .eq("id_collection", id_collection)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getLookForCollectionCard;