import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default async function addToLastProductsSeen(productId, userEmail){
    //console.log('add')
    const supabase = createClientComponentClient();

    const { error } = await supabase
        .from('last_products_seen')
        .insert({ id_product: productId, user_email: userEmail })
        
    if (error) {
        console.log(error)
    }

}