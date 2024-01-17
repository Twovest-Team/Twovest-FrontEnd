import { supabase } from "@/utils/db/supabase";
import getLookStyles from "./getLookStyles";
import capitalizeFirstLetter from "../capitalizeFirstLetter";

const getLooksForHomepage = async (gender) => {
  gender = capitalizeFirstLetter(gender);

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
        img
    )
`
    )
    .eq("submission_state", 2)
    .eq("gender", gender)
    .order("created_at", { ascending: true })
    .limit(8);

  let arrayOfLooks = await Promise.all(
    data.map(async (element) => {
      let array = element;
      const styles = await getLookStyles(element.id);
      array.styles = styles;

      return array;
    })
  );

  if (error) {
    console.log(error);
  } else {
    return arrayOfLooks;
  }
};

export default getLooksForHomepage;
