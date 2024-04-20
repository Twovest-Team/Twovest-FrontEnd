import { createClient } from "@supabase/supabase-js";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import getCartTotalPrice from "@/utils/getCartTotalPrice";
import removeFromCart from "@/utils/db/cart/removeFromCart";

export async function GET(req) {
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
    throw new Error("Erro ao buscar dados do carrinho");
  }

  if(cartData){
    console.log("CARTDATA----", cartData)
    let totalPurchasePrice = parseFloat(getCartTotalPrice(cartData));
    //console.log(totalPurchasePrice)
    
    let arrayOffers = cartData.map(obj => obj.offers.id)
    
    const { data, error } = await supabase.rpc('create_purchase', { total: totalPurchasePrice, id_user: currentUser.id, id_offer: arrayOffers })

     if(data){
      removeFromCart(cartData.id, currentUser.email);
    } 

    //console.log("----DATA",data)
    //console.log(error)

    /* // Inserir dados na tabela purchases
    const { data: purchaseData, error: purchaseError } = await supabase
    .from("purchases")
    .insert({
      id_user: currentUser.id,
      total: totalPurchasePrice,
    })
    .single();

  if (purchaseError) {
    throw new Error("Erro ao inserir dados na tabela de compras");
  }

  if(purchaseData){
    return NextResponse.json(purchaseData);
  }
     */
    
  }



 
  /*
  // Inserir dados na tabela purchases_has_offers
  for (const item of cartData) {
    await supabase.from("purchases_has_offers").insert({
      id_purchase: purchaseData.id,
      id_offer: item.id_offer,
    });
  }

  res
    .status(200)
    .json({ message: "Dados inseridos com sucesso nas tabelas de compras" }); */
}
