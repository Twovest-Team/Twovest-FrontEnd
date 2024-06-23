import getAllCoupons from "@/utils/db/getAllCoupons";
import NavigationTitle from "@/components/providers/NavigationTitle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import CouponCard from "@/components/cards/CouponCard";
import getUserCoupons from "@/utils/db/getUserCoupons";
import ContentSlider from "@/components/sliders/ContentSlider";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";

export default async function PontosECupoes() {
  const currentUser = await useAuthServer();

  if (!currentUser) {
    return (
      <NoResultsNotice
        title={"Acesso negado."}
        text={"Tens que iniciar sessão para aceder a esta página."}
        btnText={"Ir para Geral"}
      />
    );
  } else if (currentUser) {
    const userCoupons = await getUserCoupons(currentUser.id);

    const couponCemData = await getAllCoupons(100, 0);

    const couponDuzentosData = await getAllCoupons(200, 100);

    const couponTrezentosData = await getAllCoupons(300, 200);

    let progresso;
    let precoCupaoSorte = 500;

    if (currentUser.points >= precoCupaoSorte) {
      progresso = 100;
    } else {
      progresso = (currentUser.points / precoCupaoSorte) * 100;
    }

    return (
      <main>
        <NavigationTitle titleText={"Pontos&Cupões"}>
          <div className="flex gap-2 text-secondary items-center">
            <p
              className="hidden sm:block text-right text-gray-700"
              aria-label="Descobre como funciona"
            >
              Descobre como funciona
            </p>
            <HelpOutlineIcon />
          </div>
        </NavigationTitle>
        <div className="container text-center mt-14 mb-8">
          <div className="bg-white mx-auto pt-16 pb-12 relative rounded border shadow-md shadow-grey xl:w-1/2 justify">
            <div className="flex flex-col gap-6">
              <h4 className="flex flex-row justify-center text-h4">
                <p className="pr-4 font-semibold">Total de pontos: </p>
                <span
                  className="text-primary_main"
                  aria-label={currentUser.points}
                >
                  {currentUser.points}
                  <AutoModeIcon className="ml-2" />
                </span>
              </h4>
              <h5 className="text-h5">
                <span className="font-semibold mr-2" aria-label="350">
                  {currentUser.points >= precoCupaoSorte
                    ? 0
                    : precoCupaoSorte - currentUser.points}
                  <AutoModeIcon className="ml-2" />
                </span>
                para o cupão da sorte
              </h5>
              <div className="w-1/2 mx-auto bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary_main h-2.5 rounded-full"
                  style={{ width: `${progresso}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-primary_main absolute -top-10 left-1/2 -translate-x-1/2 text-white rounded-full w-20 aspect-square flex items-center justify-center">
              <AutoModeIcon className="text-[48px]" />
            </div>
          </div>
        </div>

        <h4 className="text-h4 mb-6 container">Os meus cupões</h4>
        {userCoupons.length > 0 ? (
          <ContentSlider fixedElement={true}>
            {userCoupons.map((coupon) =>
              coupon.quantity > 0 ? (
                <CouponCard userCoupon={coupon} key={coupon.id_coupon} />
              ) : null
            )}
          </ContentSlider>
        ) : (
          <h6 className="text-h6 mb-6  text-secondary container">
            {" "}
            Ainda não tens nenhum cupão
          </h6>
        )}

        <h4 className="text-h4 mt-4 mb-6 container">Desbloquear cupões</h4>
        <h6 className="text-h6 mb-6  text-secondary container">
          Cupões até 100 <AutoModeIcon className="ml-2" />
        </h6>
        <ContentSlider fixedElement={true}>
          {couponCemData.map((coupon) => (
            <CouponCard allCoupons={coupon} key={coupon.id} />
          ))}
        </ContentSlider>
        <h6 className="text-h6 my-6  text-secondary container">
          Cupões até 200 <AutoModeIcon className="ml-2" />
        </h6>
        <ContentSlider fixedElement={true}>
          {couponDuzentosData.map((coupon) => (
            <CouponCard allCoupons={coupon} key={coupon.id} />
          ))}
        </ContentSlider>
        <h6 className="text-h6 my-6  text-secondary container">
          Cupões até 300 <AutoModeIcon className="ml-2" />
        </h6>
        <ContentSlider fixedElement={true}>
          {couponTrezentosData.map((coupon) => (
            <CouponCard allCoupons={coupon} key={coupon.id} />
          ))}
        </ContentSlider>
      </main>
    );
  }
}
