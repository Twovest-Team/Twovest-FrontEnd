import supabase from '@/utils/db/clients/public/supabase';

const getUserById = async (id_user) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      created_at,
      name,
      img,
      email,
      points
  `
    )
    .eq("id", id_user)
    .single()

  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default getUserById;
