import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function removeFromUserHistory(productId, userEmail) {

    const supabase = createClientComponentClient();

    const { error } = await supabase
        .from('last_products_seen')
        .delete()
        .eq('id_product', productId)
        .eq('user_email', userEmail)

    if (error) {
        console.log(error)
    }

}
