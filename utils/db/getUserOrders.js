import supabase from "@/utils/db/clients/public/supabase";

export default async function getUserOrders(id_user) {
  try {
    const { data: ordersData, error: ordersError } = await supabase
      .from("purchases")
      .select(
        `
        *,
        purchases_has_coupons(
          coupons(
            id,
        title,
        description,
        discount,
        cost,
        is_special
          )
        ),
        purchases_has_offers(
          offers(
            *,
            colors (
                name
            ),
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
                *
              )
            ),
            sizes (
                size,
                type
            ),
            conditions (
                name
            )
          )
        )
        `
      )
      .eq("id_user", id_user);

    function transformUserOrdersObject(ordersArray) {
      return ordersArray.map((order) => {
        const coupons = order.purchases_has_coupons.map((item) => item.coupons);
        const offers = order.purchases_has_offers.map((item) => item.offers);

        const { purchases_has_coupons, purchases_has_offers, ...rest } = order;

        return {
          ...rest,
          coupons,
          offers,
        };
      });
    }

    if (ordersError) throw ordersError;
    if (ordersData) return transformUserOrdersObject(ordersData);
  } catch (error) {
    console.log(error);
    return { error };
  }
}
