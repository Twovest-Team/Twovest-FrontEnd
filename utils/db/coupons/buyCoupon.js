'use server'

import supabase from "../clients/admin/supabase";

import checkIfUserHasCoupon from "../checkIfUserHasCoupon";
import updateUserCouponQuantity from "./updateUserCouponQuantity";


export default async function buyCoupon(user, coupon) {
  // Saldo que o utilizador tem
  const points = user.points;

  // Custo do cupão que está a tentar comprar
  const cost = coupon.cost;

  const id_user = user.id;
  const id_coupon = coupon.id;
  // Verifica se tem pontos suficientes para a compra
  if (points >= cost) {
    const userHasCoupon = await checkIfUserHasCoupon(id_user, id_coupon);

    // Verifica se o utilizador já possui ou já possuiu o cupão que tenta comprar
    if (userHasCoupon.length > 0) {
      const newQuantity = userHasCoupon[0].quantity + 1;
      // Atualiza a coluna "quantity", visto que já tem/teve o cupão
      await updateUserCouponQuantity(id_user, id_coupon, newQuantity);
    } else {
      // Cria uma nova linha na tabela "users_has_coupons", visto que nunca teve este cupão
      try {
        const { data: couponPurchaseData, error: couponPurchaseError } =
          await supabase
            .from("users_has_coupons")
            .insert({ id_coupon: id_coupon, id_user: id_user });
        // Erro ao comprar cupão. Tente novamente.
        if (couponPurchaseError) {
          console.log(couponPurchaseError);
          return 1;
        } else {
          console.log(couponPurchaseData);
        }
      } catch (error) {
        console.log(error);
        return 1;
      }
    }
    // Substrai os pontos que tem ao custo do cupão
    const newPoints = points - cost;

    try {
      const { data: removePointsData, error: removePointsError } =
        await supabase
          .from("users")
          .update({ points: newPoints })
          .eq("id", id_user);

      //Erro ao retirar saldo. Tente novamente.
      if (removePointsError) {
        console.log(removePointsError);
        return 2;
      }
    } catch (error) {
      console.log(error);
      return 2;
    }

    //Compra de cupão efetuada com sucesso.
    return 3;
  } else {
    // Se chegou aqui, o utilizador não tem saldo suficiente
    return 4;
  }
}
