import { supabase } from "@/utils/db/supabase";
import getGender from "../getGender";

const getLooksForGallery = async (gender) => {

  const genderId = getGender(gender).id

  const { data, error } = await supabase
    .from('looks')
    .select(
      `
    id,
    upvotes,
    gender,
    url_image,
    users(
        id,
        name,
        img
    ),
    looks_has_styles(
      styles(
        name
      )
    )
    `
    )
    .eq('submission_state', 2)
    .eq('gender', genderId);

  function transformLooksObject(looksArray) {
    return looksArray.map(look => {
      const styles = look.looks_has_styles.map(item => item.styles.name);
      const { looks_has_styles, ...rest } = look;
      return {
        ...rest,
        styles
      };
    });
  }

  if (data) return transformLooksObject(data);
  if (error) console.log('error', error);

};

export default getLooksForGallery; 
