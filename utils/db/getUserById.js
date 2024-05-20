import supabase from "@/utils/db/clients/public/supabase";

const getUserById = async (id_user) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        `
      id,
      created_at,
      name,
      img,
      email,
      points,
      role
  `
      )
      .eq("id", id_user)
      .single();

    if (data) return data;
    if (error) throw error;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getUserById;
