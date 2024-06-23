import CouponBuyButton from "@/components/buttons/CouponBuyButton";
import CardBackgroundYellow from "@/public/static/images/coupons/cupao_amarelo.svg";
import CardBackgroundGreen from "@/public/static/images/coupons/cupao_verde.svg";
import CardBackgroundLucky from "@/public/static/images/coupons/cupao_da_sorte.svg";
import CardBackgroundBlue from "@/public/static/images/coupons/cupao_azul.svg";
import Image from "next/image";
import getStorageImage from "@/utils/getStorageImage";

const CouponCard = ({ userCoupon, allCoupons }) => {
  // Se o tipo de cupão que é mostrado é um já comprado pelo utilizador

  if (userCoupon) {
    return (
      <div className="w-[329px] h-[215px] relative">
        <Image
          src={
            userCoupon.coupons.cost > 200
              ? CardBackgroundBlue
              : CardBackgroundGreen
          }
          fill={true}
          alt="Card de um cupão de fundo verde"
        />

        <div className="w-10/12 left-[25px] top-[110px] absolute flex-col justify-center items-start gap-[3 px] inline-flex">
          <h6 className="text-white font-semibold text-h4">
            {userCoupon.coupons.discount}%
          </h6>
          <p className="text-white">{userCoupon.coupons.description}.</p>
        </div>
        <div className="w-10/12 left-[25px] top-[25px] absolute justify-between items-center inline-flex ">
          <div className="w-[135px] px-[25px] h-[35px] bg-white rounded-[170px] justify-center items-center inline-flex">
            <p
              className={
                userCoupon.coupons.cost > 200
                  ? `text-info_main font-semibold align-middle`
                  : `text-primary_main font-semibold align-middle`
              }
            >
              {userCoupon.quantity > 1
                ? ` ${userCoupon.quantity} cupões`
                : ` ${userCoupon.quantity} cupão`}
            </p>
          </div>

          {userCoupon.coupons.coupons_has_brands.map((element) => (
            <Image
              src={getStorageImage(element.brands.logo_url)}
              width={35}
              height={35}
              alt={element.brands.name}
              className="rounded-full shadow-md"
              key={element.brands.id}
            />
          ))}
        </div>
      </div>
    );
  }

  // Se o tipo de cupão for os que estão disponíveis para serem comprados
  if (allCoupons) {
    return (
      <div className="w-[329px] h-[215px] relative">
        <Image
          src={
            allCoupons.cost > 200 ? CardBackgroundBlue : CardBackgroundGreen
          }
          fill={true}
          alt="Card de um cupão de fundo verde"
        />
        <div className="w-10/12 left-[25px] top-[110px] absolute flex-col justify-center items-start gap-[3 px] inline-flex">
          <h6 className="text-white font-semibold text-h4">
            {allCoupons.discount}%
          </h6>
          <p className="text-white">{allCoupons.description}.</p>
        </div>
        <div className="w-10/12 left-[25px] top-[25px] absolute justify-between items-center inline-flex ">
          <CouponBuyButton coupon={allCoupons} />
          <Image
            src={getStorageImage(allCoupons.brands[0].logo_url)}
            width={35}
            height={35}
            alt={allCoupons.brands[0].name}
            className="rounded-full shadow-md"
            key={allCoupons.brands[0].id}
          />
        </div>
      </div>
    );
  }
};

export default CouponCard;

/*
<div className="w-[454px] h-[297px] relative">
    <div className="w-[363.38px] h-[99.26px] left-[36px] top-[169.83px] absolute flex-col justify-center items-start gap-[6.73px] inline-flex">
        <div className="text-white text-[46.52px] font-semibold font-['Inter']">-15%</div>
        <div className="self-stretch text-white text-[22.43px] font-normal font-['Inter']">Na próxima compra efetuada de um artigo da Zara.</div>
    </div>
    <div className="w-[363.38px] left-[36px] top-[26.83px] absolute justify-between items-start inline-flex">
        <div className="w-[143.75px] px-[40.38px] bg-white rounded-[168.23px] justify-start items-center gap-[6.73px] flex">
            <div className="text-orange-400 text-[32.30px] font-semibold font-['Inter']">Z20</div>
        </div>
        <div className="w-[67.28px] h-[67.28px] relative">
            <div className="w-[67.28px] h-[67.28px] left-0 top-0 absolute bg-black rounded-full" />
            <img className="w-[49.58px] h-[14.16px] left-[8.86px] top-[26.56px] absolute" src="https://via.placeholder.com/50x14" />
        </div>
    </div>
</div>

*/

/* if (userCoupon) {
  return (
    <div className="w-96 h-64 flex flex-col gap-6 border-2">
      <div className="mx-6 mt-4 flex justify-between">
        <p>Custo: {userCoupon.coupons.cost}</p>
        Vai ser necessário mapear a brands e mostrar vários logos caso o cupão tenha mais que 1 marca
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
} */

{
  /* <div className="w-[329px] h-[215px] relative">
        <Image
          src={CardBackgroundGreen}
          fill={true}
          alt="Picture of the author"
        />
    <div className="w-10/12 left-[25px] top-[110px] absolute flex-col justify-center items-start gap-[3 px] inline-flex">
        <h6 className="text-white font-semibold text-h4">-15%</h6>
        <p className="text-white">Na próxima compra efetuada de um artigo da Zara.</p>
    </div>
    <div className="w-10/12 left-[25px] top-[25px] absolute justify-between items-start inline-flex">
        <div className="w-[143.75px] px-[40.38px] bg-white rounded-[168.23px] justify-start items-center gap-[6.73px] flex">
            <div className="text-orange-400 text-[32.30px] font-semibold font-['Inter']">Z20</div>
        </div>
        <div className="w-[67.28px] h-[67.28px] relative">
            <div className="w-[67.28px] h-[67.28px] left-0 top-0 absolute bg-black rounded-full" />
            <img className="w-[49.58px] h-[14.16px] left-[8.86px] top-[26.56px] absolute" src="https://via.placeholder.com/50x14" />
        </div>
    </div>
        
      </div> 

      if (allCoupons) {
        return (
          <div className="w-96 h-64 flex flex-col gap-6 border-2">
            <div className="mx-6 mt-4 flex justify-between">
              <p>Custo: {allCoupons.cost}</p>
              Vai ser necessário mapear a brands e mostrar vários logos caso o cupão tenha mais que 1 marca
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

        */
}
