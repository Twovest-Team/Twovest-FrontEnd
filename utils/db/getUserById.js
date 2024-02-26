import { supabase } from "@/utils/db/supabase";

const getUserById = async (id_user) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      created_at,
      name,
      img,
      email
  `
    )
    .eq("id", id_user);

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getUserById;
