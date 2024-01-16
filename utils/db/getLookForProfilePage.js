import { supabase } from "@/utils/db/supabase";

const getLookForProfilePage = async (id_user) => {
  const { data, error } = await supabase
    .from("looks")
    .select(
      `
    id,
    url_image,
    upvotes
`
    )
    .eq("id_user", id_user)
    .eq("submission_state",2)

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getLookForProfilePage;
