import { supabase } from "@/utils/db/supabase";
import getCollections from "./collections/getCollections";
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

  const colecoes = await getCollections(id_user);
  const userLooks = await getLookForProfilePage(id_user);

 
  if (colecoes && colecoes.length > 0) {
    data[0].colecoes = colecoes;
  }

  if (userLooks && userLooks.length > 0) {
    data[0].userLooks = userLooks;
  }

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getInfoForProfilePage;
