import supabase from "@/utils/db/clients/public/supabase";
import getGender from "../getGender";

const getProductsByBrand = async (gender, brandName) => {
  const genderId = getGender(gender).id;

  try {
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select(
        `
        id,
        reference,
        is_sustainable,
        views,
        gender,
        name,
        discount,
        brands!inner (
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
`
      )
      .eq("gender", genderId)
      .eq("is_public", true)
      .eq("brands.name", brandName);

    function transformProductObject(productArray) {
      return productArray.map((product) => {
        const materials = product.products_has_materials.map(
          (item) => item.materials.name
        );
        const styles = product.products_has_styles.map(
          (item) => item.styles.name
        );

        const { products_has_materials, products_has_styles, ...rest } =
          product;

        return {
          ...rest,
          materials,
          styles,
        };
      });
    }

    if (productError) throw productError;
    if (productData) return transformProductObject(productData);
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default getProductsByBrand;
