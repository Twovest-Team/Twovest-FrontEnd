import { supabase } from "@/utils/db/supabase";
import getUserById from "./getUserById";
import getCouponById from "./getCouponById";
import checkIfUserHasCoupon from "./checkIfUserHasCoupon";

export default async function buyCoupon(id_user, id_coupon) {
  const user = await getUserById(id_user);
  const points = user.points;

  const coupon = await getCouponById(id_coupon);
  const cost = coupon.cost

  if(points >= cost)
  {
    //VERIFICAR SE ELE JÁ TEM CUPÃO
    
    const userHasCoupon = await checkIfUserHasCoupon(id_user,id_coupon)
    console.log(userHasCoupon)

    if(userHasCoupon.length > 0)
    {
        console.log("JÁ TEM ESTE CUPÃO. BASTA ADICIONAR 1 NA QUANTITY E SUBTRAIR")
    } else {
        console.log("AINDA NÃO TEM CUPÃO. É PRECISO FAZER UM INSERT COM ID DE USER E CUPAO")
    }


    console.log("TEM GUITO. PODE COMPRAR")
  } else {
    console.log("NÃO TEM GUITO. RETORNAR MENSAGEM A DIZER QUE NAO PODE COMPRAR FALTA GUITO")
  }
  


/* const { couponPurchaseData, couponPurchaseError } = await supabase
    .from("users_has_coupons")
    .insert([{ id_coupon: id_coupon, id_user: id_user }])
    .select();
 */

  
}
