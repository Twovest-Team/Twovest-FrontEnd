import { supabase } from "@/utils/db/supabase";
import getCollectionsForCard from "./getCollectionsForCard";
import getLookForProfilePage from "./getLookForProfilePage";

const getInfoForProfilePage = async (id_user) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
    id,
    name,
    img,
    email,
    created_at
`
    )
    .eq("id", id_user);

  const colecoes = await getCollectionsForCard(id_user);
  const userLooks = await getLookForProfilePage(id_user);

  if (colecoes.length > 0)
  {
    data[0].colecoes = colecoes;
  }
  
  if (userLooks.length > 0)
  {
  data[0].userLooks = userLooks;
  }

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getInfoForProfilePage;
