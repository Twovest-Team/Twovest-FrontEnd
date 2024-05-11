import supabase from "@/utils/db/clients/public/supabase";

const getAllColors = async () => {
  try {
    const { data, dataError } = await supabase.from("colors").select();

    if (dataError) throw dataError;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getAllColors;
