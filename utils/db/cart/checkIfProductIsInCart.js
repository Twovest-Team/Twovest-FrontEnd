import { supabase } from '@/utils/db/supabase'
import addToCart from './addToCart'
import updateCartProductQty from './updateCartProductQty'
import getUserCartProducts from './getUserCartProducts'
import { productMaxQty } from '@/constants'

export default async function checkIfProductIsInCart(offerId, userEmail) {

    const { data, error } = await supabase
        .from('cart')
        .select('*')
        .match({ id_offer: offerId, email: userEmail })

    if (error) {
        console.log(error)

    } else {
        if (data.length > 0 && data[0].qty < productMaxQty) {
            await updateCartProductQty(data[0].id, userEmail, data[0].qty, '+')
        } else {
            await addToCart(offerId, userEmail)
        }

        const updatedCart = await getUserCartProducts(userEmail)

        if (updatedCart) {
            return updatedCart
        }
    }


}