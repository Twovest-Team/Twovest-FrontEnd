import { supabase } from "@/utils/db/supabase";
import getLookStyles from "./getLookStyles";
import getGender from "../getGender";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";

const getLooksForGallery = async (gender) => {

  const genderId = getGender(gender).id
  const currentUser = await useAuthServer();

  const { data: testeData, error: testeError } = await supabase.rpc
    ('fetch_gallery_looks',
      { userid: currentUser.id, genderid: genderId }             
    )
  console.log(testeData, testeError)



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
    )
`
    )
    .eq('submission_state', 2)
    .eq('gender', genderId);

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
