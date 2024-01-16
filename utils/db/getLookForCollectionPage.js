import { supabase } from "@/utils/db/supabase";
import getUserById from "./getUserById";

const getLookForCollectionPage = async (id_collection) => {
  const { data, error } = await supabase
    .from("collections_has_looks")
    .select(
      `
        id_look,
        created_at,
        looks(
            id,
            url_image,
            id_user
        )
  `
    )
    .eq("id_collection", id_collection)
    .order("created_at", { ascending: false });

  let transformedData = await Promise.all(
    data.map(async (element) => {
      let array = element;
      const userLook = await getUserById(element.looks.id_user);
      array.userLook = userLook;

      return array;
    })
  );

  if (error) {
    console.log(error);
  } else {
    return transformedData;
  }
};

export default getLookForCollectionPage;
