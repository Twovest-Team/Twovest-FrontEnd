import updateUserCouponQuantity from "./db/updateUserCouponQuantity";

export default async function usedCoupon(cupao) {
  // Tira 1 à quantidade que o utilizador tem, visto que acabou de o utilizar
  const newQuantity = cupao.quantity - 1;

  // Atualiza a quantidade com a nova quantidade (quantidade que tinha -1)
  const updateStatus = await updateUserCouponQuantity(
    cupao.id_user,
    cupao.id_coupon,
    newQuantity
  );

  return updateStatus;
}
