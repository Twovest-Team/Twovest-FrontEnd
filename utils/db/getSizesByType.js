import supabase from "@/utils/db/clients/public/supabase";

const getSizesByType = async (type) => {
  try {
    const { data, error } = await supabase
      .from("sizes")
      .select()
      .eq("type", type);

    if (data) return data;
    if (error) throw error;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getSizesByType;
