import { createClient } from "@supabase/supabase-js";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import getCartTotalPrice from "@/utils/getCartTotalPrice";

export async function GET(req) {
  console.log(req)
  const cookieStore = cookies();
  const currentUser = await useAuthServer();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Buscar dados do carrinho de compras do utilizador
  const { data: cartData, error: cartError } = await supabase
    .from("cart")
    .select(
      ` id,
        qty, 
        offers(
            id,
            price,
            products(
                discount
            )
        )`
    )
    .eq("email", currentUser.email);

  if (cartError) {
    //console.log(cartError);
    throw new Error("Erro ao buscar dados do carrinho");
  }

  if (cartData) {
    //console.log("CARTDATA----", cartData)
    let totalPurchasePrice = parseFloat(getCartTotalPrice(cartData));
    //console.log(totalPurchasePrice)

    let arrayOffers = cartData.map((obj) => obj.offers.id);

    const { data, error } = await supabase.rpc("create_purchase", {
      total: totalPurchasePrice,
      id_user: currentUser.id,
      id_offer: arrayOffers,
    });

    //console.log(error);

    if (data) {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("email", currentUser.email);
      //console.log(error)
      return NextResponse.redirect(process.env.NEXT_PUBLIC_URL);
      
    }
  }
}
