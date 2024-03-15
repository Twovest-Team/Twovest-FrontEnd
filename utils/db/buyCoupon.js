import { supabase } from "@/utils/db/supabase";
import getUserById from "./getUserById";
import getCouponById from "./getCouponById";
import checkIfUserHasCoupon from "./checkIfUserHasCoupon";
import updateUserCouponQuantity from "./updateUserCouponQuantity";

export default async function buyCoupon(id_user, id_coupon) {
  // Saldo que o utilizador tem
  const user = await getUserById(id_user);
  const points = user.points;

  // Custo do cupão que está a tentar comprar
  const coupon = await getCouponById(id_coupon);
  const cost = coupon.cost;

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
        const { couponPurchaseData, couponPurchaseError } = await supabase
          .from("users_has_coupons")
          .insert([{ id_coupon: id_coupon, id_user: id_user }]);

        if (couponPurchaseError) throw couponPurchaseError;
      } catch (error) {
        console.log(error);
        return "Erro ao comprar cupão. Tente novamente.";
      }
    }
    // Substrai os pontos que tem ao custo do cupão
    const newPoints = points - cost;

    try {
      const { removePointsData, removePointsError } = await supabase
        .from("users")
        .update({ points: newPoints })
        .eq("id", id_user);

      if (removePointsError) throw removePointsError;
    } catch (error) {
      console.log(error);
      return "Erro ao retirar saldo. Tente novamente";
    }

    return "Compra de cupão efetuada com sucesso";
  } else {
    // Se chegou aqui, o utilizador não tem saldo suficiente
    return "Não tem saldo suficiente para efetuar a compra";
  }
}
