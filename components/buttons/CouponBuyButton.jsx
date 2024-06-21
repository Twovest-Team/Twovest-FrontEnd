"use client";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import Button from "./Button";
import useAuth from "@/hooks/client-hooks/useAuth";
import buyCoupon from "@/utils/db/buyCoupon";
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
      <Button
        type={coupon.cost > 200 ? `info` : `primary`}
        ariaLabel="Comprar cupão"
        className="w-[135px] px-[25px] h-[35px] bg-white rounded-[170px] justify-center items-center inline-flex"
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
          <AutoModeIcon className="ml-2" />
        </p>
      </Button>

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
