import supabase from "@/utils/db/clients/public/supabase";

export default async function getUserCartProducts(email) {
  try {
    const { data, error } = await supabase
      .from("cart")
      .select(
        `
        id,
    offers (
        id,
        products(
            id,
            brands (
                name
            ),
            categories (
                id
            ),
            images : products_has_images(
                id,
                url,
                alt
              ),
            is_sustainable,
            discount,
            gender
        ),
        colors (
            name
        ),
        conditions (
            id,
            name
        ),
        sizes (
            size
        ),
        price,
        qty
    ),
    qty,
    created_at
    `
      )
      .eq("email", email)
      .order("created_at", { ascending: true });

    if (data) return data;
    else if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
