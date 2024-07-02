import supabase from "@/utils/db/clients/public/supabase";
import getGender from "../getGender";

const getLooksForGallery = async (gender) => {
  const genderId = getGender(gender).id;

  try {
    const { data, error } = await supabase
      .from("looks")
      .select(
        `
    id,
    upvotes,
    gender,
    url_image,
    users(
        id,
        name,
        img,
        role,
        provider
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
      .order('id', { ascending: false })

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

export default getLooksForGallery;
