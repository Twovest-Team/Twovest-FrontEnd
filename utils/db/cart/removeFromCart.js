import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import getUserCartProducts from "./getUserCartProducts";

export default async function removeFromCart(cartId, userEmail) {

    const supabase = createClientComponentClient();
    console.log("OLÁ!")

    const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', cartId)

    if (error) {
        console.log(error)
    }else{
        const updatedCart = await getUserCartProducts(userEmail)

        if (updatedCart) {
            return updatedCart
        }
    }

}
