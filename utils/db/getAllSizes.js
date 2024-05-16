import supabase from "@/utils/db/clients/public/supabase";

const getAllSizes = async () => {
  try {
    const { data, dataError } = await supabase.from("sizes").select();

    if (dataError) throw dataError;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getAllSizes;
