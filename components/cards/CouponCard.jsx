const CouponCard = ({ userCoupon, allCoupons }) => {
  // Se o tipo de cupão que é mostrado é um já comprado pelo utilizador
  if (userCoupon) {
    return (
      <div className="w-96 h-64 flex flex-col gap-6 border-2">
        <div className="mx-6 mt-4 flex justify-between">
          <p>Custo: {userCoupon.coupons.cost}</p>
          {/*Vai ser necessário mapear a brands e mostrar vários logos caso o cupão tenha mais que 1 marca*/}
          <p>Marca: {userCoupon.coupons.coupons_has_brands[0].brands.name}</p>
        </div>
        <div className="mx-6">
          <p>-{userCoupon.coupons.discount}%</p>
        </div>
        <div className="mx-6">
          <p>{userCoupon.coupons.description}</p>
        </div>
        <div className="mx-6">
          <p>Quantidade: {userCoupon.quantity}</p>
        </div>
      </div>
    );
  }

  // Se o tipo de cupão for os que estão disponíveis para serem comprados
  if (allCoupons) {
    return (
      <div className="w-96 h-64 flex flex-col gap-6 border-2">
        <div className="mx-6 mt-4 flex justify-between">
          <p>Custo: {allCoupons.cost}</p>
          {/*Vai ser necessário mapear a brands e mostrar vários logos caso o cupão tenha mais que 1 marca*/}
          <p>Marca: {allCoupons.brands[0].name}</p>
        </div>
        <div className="mx-6">
          <p>-{allCoupons.discount}%</p>
        </div>
        <div className="mx-6">
          <p>{allCoupons.description}</p>
        </div>
      </div>
    );
  }
};

export default CouponCard;
