import supabase from "@/utils/db/clients/public/supabase";

const getAllMaterials = async () => {
  try {
    const { data, dataError } = await supabase.from("materials").select();

    if (dataError) throw dataError;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getAllMaterials;
