"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import checkIfProductIsInCart from "@/utils/db/cart/checkIfProductIsInCart";
import { updateCart } from "@/redux/slices/cartProducts";
import { useState } from "react";
import Notifications from "@/components/modals/Notifications";
import LoadingIcon from "./LoadingIcon";
import { useRouter } from "next/navigation";
import withAuth from "@/hocs/withAuth";

const BuyButton = ({ offerId, currentUser }) => {
  const dispatch = useAppDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    if (currentUser) {
      setLoading(true);
      const response = await checkIfProductIsInCart(offerId, currentUser.email);
      if (response) {
        setLoading(false);
        setIsClicked(!isClicked);
        setTimeout(() => {
          setIsClicked(false);
        }, 3200);
        dispatch(updateCart(response));
      }
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      <button
        disabled={isClicked ? true : false}
        onClick={handleClick}
        className="bg-primary_main text-white w-12 h-12 rounded flex justify-center items-center"
      >
        {!loading ? <LocalMallOutlinedIcon /> : <LoadingIcon size={22} />}
      </button>

      {isClicked && (
        <Notifications type={"Success"} message={"Artigo adicionado"} />
      )}
    </>
  );
};

export default withAuth(BuyButton);
