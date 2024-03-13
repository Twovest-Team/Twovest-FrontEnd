import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import removeFromCart from "./removeFromCart";
import getUserCartProducts from "./getUserCartProducts";


export default async function updateCartProductQty(cartId, userEmail, qty, type) {

    const supabase = createClientComponentClient();
    let updatedQty = qty;

    if (type === '+') {
        updatedQty = updatedQty + 1
    } else if (type === '-') {
        updatedQty = updatedQty - 1
    }

    let updatedCart;
    
    if (updatedQty === 0) {
        updatedCart = await removeFromCart(cartId, userEmail)
    } else {
        const { error } = await supabase
            .from('cart')
            .update({ qty: updatedQty })
            .eq('id', cartId)

        if (error) {
            console.log(error)
        } else {
            updatedCart = await getUserCartProducts(userEmail)
        }
    }

    if (updatedCart) {
        return updatedCart
    }


}