import supabase from '@/utils/db/clients/public/supabase';

const getLookStyles = async (id) => {
  const { data } = await supabase
    .from("looks_has_styles")
    .select(
      `
        styles(
            name
        )
    `
    )
    .eq("id_look", id);

  let transformedData = [];
  data.map((object) => transformedData.push(object.styles.name));

  return transformedData;
};

export default getLookStyles;
