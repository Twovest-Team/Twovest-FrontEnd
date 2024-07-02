import supabase from "@/utils/db/clients/public/supabase";
import getGender from "../getGender";
import { categories } from "@/constants";

const getProducts = async (category, gender, onlySustainable = false, onlySales = false, limit= 50) => {

  const genderId = getGender(gender).id;
  const categoryOptions = category ? [category] : categories.map(category => category.id)
  const sustainabilityOptions = onlySustainable ? [true] : [true, false]
  const salesOptions = onlySales ? [0] : [-1]



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
            brands (
                logo_url,
                name
            ),
            categories!inner (
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
      .in('is_sustainable', sustainabilityOptions)
      .gt("discount", salesOptions)
      .in("categories.id", categoryOptions)
      .limit(limit);
      

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

export default getProducts;
