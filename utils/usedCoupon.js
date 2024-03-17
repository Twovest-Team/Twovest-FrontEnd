import checkIfUserHasCoupon from "./db/checkIfUserHasCoupon";
import updateUserCouponQuantity from "./db/updateUserCouponQuantity";

export default async function usedCoupon(id_user, id_coupon) {
  // Verifica se o utilizador tem o cupão
  const userHasCoupon = await checkIfUserHasCoupon(id_user, id_coupon);

  // Tira 1 à quantidade que o utilizador tem, visto que acabou de o utilizar
  const newQuantity = userHasCoupon[0].quantity - 1;

  // Atualiza a quantidade com a nova quantidade (quantidade que tinha -1)
  const updateStatus = await updateUserCouponQuantity(
    id_user,
    id_coupon,
    newQuantity
  );

  return updateStatus;
}
