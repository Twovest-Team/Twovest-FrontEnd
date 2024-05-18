import supabase from "@/utils/db/clients/public/supabase";

const getLookById = async (id) => {
  try {
    const { data: lookData, error: lookError } = await supabase
      .from("looks")
      .select(
        `
    id,
    id_user,
    upvotes,
    gender,
    url_image,
    users(
        id,
        name,
        img
    ),
    looks_has_products(
      products(
      id,
        reference,
        is_sustainable,
        views,
        gender,
        name,
        discount,
        brands (
            logo_url,
            name
        ),
        categories (
            id,
            main_category
        ),
        products_has_images(
          id,
          url,
          alt
        ),
        offers(
          id,
          price,
          qty,
          colors (
              name
          ),
          sizes (
              size,
              type
          ),
          conditions (
              id,
              name
          )
              ),
              products_has_materials(
                materials(
                  name
              )),
              products_has_styles(
                styles(
                  name
              )
          )
        )
      )
    )
`
      )
      .eq("id", id);

    function transformLookObject(lookArray) {
      return lookArray.map((look) => {
        const products = look.looks_has_products.map((item) => item.products);

        const { looks_has_products, ...rest } = look;

        return {
          ...rest,
          products,
        };
      });
    }

    if (lookError) throw lookError;
    if (lookData) return transformLookObject(lookData)[0];
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getLookById;
