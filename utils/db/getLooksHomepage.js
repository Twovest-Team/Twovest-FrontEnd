import supabase from "@/utils/db/clients/public/supabase";
import getGender from "../getGender";

const getLooksForHomepage = async (gender) => {
  const genderId = getGender(gender).id;

  try {
    const { data, error } = await supabase
      .from("looks")
      .select(
        `
    id,
    id_user,
    upvotes,
    gender,
    url_image,
    users(
        id,
        name,
        img,
        role
    ),
    looks_has_styles(
      styles(
        name
      )
    )
`
      )
      .eq("submission_state", 2)
      .eq("gender", genderId)
      .order("created_at", { ascending: true })
      .limit(8);

    function transformLooksObject(looksArray) {
      return looksArray.map((look) => {
        const styles = look.looks_has_styles.map((item) => item.styles.name);
        const { looks_has_styles, ...rest } = look;
        return {
          ...rest,
          styles,
        };
      });
    }

    if (data) return transformLooksObject(data);
    if (error) console.log("error", error);
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getLooksForHomepage;
