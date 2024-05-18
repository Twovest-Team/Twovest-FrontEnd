import supabase from "@/utils/db/clients/public/supabase";

const getLookForCollectionCard = async (id_collection) => {
  try {
    const { data: lookData, error: lookError } = await supabase
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

    if (lookError) throw lookError;
    if (lookData) return lookData;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getLookForCollectionCard;
