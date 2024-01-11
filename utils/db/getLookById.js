import { supabase } from "@/utils/db/supabase";
import getLookProducts from "./getLookProducts";

const getLookById = async (id) => {
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
        name,
        img
    )
`
    )
    .eq("id", id);

  const products = await getLookProducts(data[0].id, data[0].gender);
  data[0].products = products;

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getLookById;
