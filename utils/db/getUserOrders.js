import supabase from "@/utils/db/clients/public/supabase";

export default async function getUserOrders(id_user) {
  try {
    const { data: ordersData, error: ordersError } = await supabase
      .from("purchases")
      .select(
        `
            *
        `
      )
      .eq("id_user", id_user);

    if (ordersError) throw ordersError;
    return ordersData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
