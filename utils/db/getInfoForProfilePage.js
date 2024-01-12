import { supabase } from "@/utils/db/supabase";
import getCollectionsForCard from "./getCollectionsForCard";
import getLookForProfilePage from "./getLookForProfilePage";

const getInfoForProfilePage = async (id_user) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
    name,
    img,
    email,
    created_at
`
    )
    .eq("id", id_user);

  const colecoes = await getCollectionsForCard(id_user);
  const userLooks = await getLookForProfilePage(id_user);

  data[0].colecoes = colecoes;
  data[0].userLooks = userLooks;

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getInfoForProfilePage;
