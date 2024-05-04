import supabase from "@/utils/db/clients/public/supabase";

const getAllConditions = async () => {
  try {
    const { data, dataError } = await supabase.from("conditions").select();

    if (dataError) throw dataError;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getAllConditions;
