import supabase from "@/utils/db/clients/public/supabase";

const getProductStyles = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products_has_styles")
      .select(
        `
        styles(
            name
        )
    `
      )
      .eq("id_product", id);

    let transformedData = [];
    data.map((object) => transformedData.push(object.styles.name));

    if (data) return transformedData;
    if (error) throw error;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getProductStyles;
