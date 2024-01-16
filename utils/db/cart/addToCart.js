import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function addToCart(offerId, userEmail) {

    const supabase = createClientComponentClient();

    const { error } = await supabase
        .from('cart')
        .insert({ id_offer: offerId, email: userEmail })
        
    if (error) {
        console.log(error)
    }

}

