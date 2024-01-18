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
        id,
        name,
        img
    )
`
    )
    .eq("id", id);

  if (data) {
    const products = await getLookProducts(data[0].id, data[0].gender);
    if (products) {
      data[0].products = products;
    }

    return data[0];
  } else if (error) {
    console.log(error);
  }

};

export default getLookById;
