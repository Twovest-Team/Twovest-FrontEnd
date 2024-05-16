import supabase from "@/utils/db/clients/public/supabase";
import getProductImages from "../getProductImages";

export default async function getUserHistory(userEmail) {
  const { data, error } = await supabase
    .from("last_products_seen")
    .select(
      `
        products (
            id,
            is_sustainable,
            gender,
            discount,
            brands (
                logo_url,
                name
            ),
            categories (
                id
            )
        )
        `
    )
    .eq("user_email", userEmail)
    .order("created_at", { ascending: false });

  if (data) {
    let arrayOfProducts = await Promise.all(
      data.map(async (element) => {
        let array = element;
        const products_has_images = await getProductImages(element.products.id);

        array.products.products_has_images = products_has_images;

        return array;
      })
    );

    return arrayOfProducts;
  } else if (error) {
    console.log(error);
  }
}
