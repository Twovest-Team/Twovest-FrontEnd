"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import checkIfProductIsInCart from "@/utils/db/cart/checkIfProductIsInCart";
import { updateCart } from "@/redux/slices/cartProducts";
import { useState } from "react";
import Notification from "@/components/modals/Notification";
import LoadingIcon from "./LoadingIcon";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { showNotification } from "@/redux/slices/notificationSlice";


const BuyButton = ({ offerId }) => {

  const currentUser = useAuth()
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    if (currentUser) {
      setLoading(true);
      const response = await checkIfProductIsInCart(offerId, currentUser.email);
      if (response) {
        setLoading(false);
        dispatch(updateCart(response));
        dispatch(showNotification('buyButton'));
      }
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-primary_main text-white w-12 h-12 rounded flex justify-center items-center"
      >
        {!loading ? <LocalMallOutlinedIcon /> : <LoadingIcon size={22} />}
      </button>

      
      <Notification id={'buyButton'} type={"Success"} message={"Artigo adicionado"} />
      
    </>
  );
};

export default BuyButton;
