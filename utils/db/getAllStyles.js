import supabase from "@/utils/db/clients/public/supabase";

const getAllStyles = async () => {
  try {
    const { data, dataError } = await supabase.from("styles").select();

    if (dataError) throw dataError;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getAllStyles;
