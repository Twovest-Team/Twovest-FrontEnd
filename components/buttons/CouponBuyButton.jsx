"use client";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import Button from "./Button";
import useAuth from "@/hooks/client-hooks/useAuth";
import buyCoupon from "@/utils/db/coupons/buyCoupon";
import { useAppDispatch } from "@/redux/hooks";
import Notification from "../modals/Notification";
import { showNotification } from "@/redux/slices/notificationSlice";

export default function CouponBuyButton({ coupon }) {
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();

  async function handleClick() {
    const response = await buyCoupon(currentUser, coupon);

    if (response == 1) {
      dispatch(showNotification("erro1"));
    } else if (response == 2) {
      dispatch(showNotification("erro2"));
    } else if (response == 3) {
      dispatch(showNotification("sucesso"));
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } else if (response == 4) {
      dispatch(showNotification("erro4"));
    }
  }

  return (
    <>
      <button
        type={coupon.cost > 200 ? `info` : `primary`}
        ariaLabel="Comprar cupão"
        className="w-[67px] px-[12px] h-[17px] sm:w-[135px] sm:px-[25px] sm:h-[35px] bg-white rounded-[85px] sm:rounded-[170px] justify-center items-center flex"
        onClick={handleClick}
      >
        <p
          className={
            coupon.cost > 200
              ? `text-info_main font-semibold align-middle`
              : `text-primary_main font-semibold align-middle`
          }
        >
          {coupon.cost}
          <span className="hidden sm:flex sm:items-center">
          <AutoModeIcon className="ml-2"/>
          </span>
        </p>
      </button>

      <Notification
        id={"erro1"}
        type={"Error"}
        message={"Erro ao comprar cupão. Tente novamente."}
      />
      <Notification
        id={"erro2"}
        type={"Error"}
        message={"Erro ao retirar saldo. Tente novamente."}
      />
      <Notification
        id={"sucesso"}
        type={"Success"}
        message={"Compra de cupão efetuada com sucesso."}
      />
      <Notification
        id={"erro4"}
        type={"Error"}
        message={"Não tem saldo suficiente para efetuar a compra."}
      />
    </>
  );
}
