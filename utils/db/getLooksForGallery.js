import { supabase } from "@/utils/db/supabase";
import getLookStyles from "./getLookStyles";

const getLooksForGallery = async (gender) => {

  if(gender === 'women') gender = 'Mulher'
  if(gender === 'men') gender = 'Homem'

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
    .eq("gender", gender);

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

export default getLooksForGallery;
