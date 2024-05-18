import supabase from "@/utils/db/clients/public/supabase";

const getLookForProfilePage = async (id_user) => {
  try {
    const { data: lookData, error: lookError } = await supabase
      .from("looks")
      .select(
        `
    id,
    url_image,
    upvotes,
    users(
      id
    )
`
      )
      .eq("id_user", id_user)
      .eq("submission_state", 2);

    if (lookError) throw lookError;
    if (lookData) return lookData;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getLookForProfilePage;
