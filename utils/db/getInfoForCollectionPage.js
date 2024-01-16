import { supabase } from "@/utils/db/supabase";
import getLookForCollectionPage from "./getLookForCollectionPage";
import getUsersForCollectionCard from "./getUsersForCollectionCard";

const getInfoForCollectionPage = async (id_collection, id_current_user) => {
  const { data, error } = await supabase
    .from("collections")
    .select(
      `
      id,
      name,
      privacy
  `
    )
    .eq("id", id_collection);

  const looks = await getLookForCollectionPage(id_collection);
  const collectionUsers = await getUsersForCollectionCard(
    id_collection,
    0
  );

    if(looks.length > 0)
    {
    data[0].looks = looks;
    }

    if (collectionUsers.length > 0)
    {
    data[0].collectionUsers = collectionUsers;
    }

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getInfoForCollectionPage;
