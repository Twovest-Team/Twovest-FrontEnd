"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import checkIfProductIsInCart from "@/utils/db/cart/checkIfProductIsInCart";
import { updateCart } from "@/redux/slices/cartProducts";
import { useState } from "react";
import LoadingIcon from "./LoadingIcon";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/client-hooks/useAuth";
import { showNotification } from "@/redux/slices/notificationSlice";
import Button from "../Button";
import { openModal } from "@/redux/slices/modalSlice";


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
      dispatch(openModal("authModal"))
    }
  }

  return (
    <>

      <Button onClick={handleClick} padding='14px' type={'primary'} ariaLabel='Adicionar ao carrinho' onlyIcon={true}>
        <div className="w-6 h-6 flex justify-center items-center">
          {!loading ? <LocalMallOutlinedIcon /> : <LoadingIcon size={22} />}
        </div>
      </Button>


    </>
  );
};

export default BuyButton;
