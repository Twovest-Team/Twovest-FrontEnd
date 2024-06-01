import supabase from "@/utils/db/clients/public/supabase";

export default async function getUserHistory(userEmail) {
  try {
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
            offers(
              id,
              price,
              qty,
              conditions (
                id,
                name
              )
            ),
            products_has_images(
              id,
              url,
              alt
            ),
            categories (
                id
            )
        )
        `
      )
      .eq("user_email", userEmail)
      .order("created_at", { ascending: false });

    if (data) return data;
    else if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
