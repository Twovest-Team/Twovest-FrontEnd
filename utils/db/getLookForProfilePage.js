import { supabase } from "@/utils/db/supabase";

const getLookForProfilePage = async (id_user) => {
  const { data, error } = await supabase
    .from("looks")
    .select(
      `
    id,
    url_image
`
    )
    .eq("id_user", id_user);

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getLookForProfilePage;
