import supabase from "@/utils/db/clients/public/supabase";

const getBrands = async (limit ) => {
    try {
      const { data, dataError } = await supabase
        .from("brands")
        .select("*")
        .order("name", { ascending: true })
        .limit(limit || 100);

      if (dataError) throw dataError;
      return data;
    } catch (error) {
      console.log(error);
      return { error };
    }
  
};

export default getBrands;
