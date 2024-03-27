"use client";

import { CardCart } from "../cards/CardCart";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartToggle";
import { useEffect, useState } from "react";
import getUserCartProducts from "@/utils/db/cart/getUserCartProducts";
import { updateCart } from "@/redux/slices/cartProducts";
import getCartTotalPrice from "@/utils/getCartTotalPrice";
import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toggleMenu } from "@/redux/slices/menuToggle";
import Notification from "../modals/Notification";
import { showNotification } from "@/redux/slices/notificationSlice";
import { NoResultsNotice } from "../sections/NoResultsNotice";
import Button from "../buttons/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "../buttons/icons/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useAuth from "@/hooks/client-hooks/useAuth";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((state) => state.cartToggle.isOpen);
  let products = useAppSelector((state) => state.cartProducts.products);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  function handleLoading(boolean) {
    setLoading(boolean);
  }

  function handleClickCart() {
    dispatch(toggleCart());
  }

  function detectUserCart() {
    if (currentUser && products.length === 0) {
      async function getProductsData() {
        const data = await getUserCartProducts(currentUser.email);
        if (data) {
          dispatch(updateCart(data));
        }
      }

      getProductsData();
    } else {
      dispatch(updateCart([]));
    }
  }

  useEffect(() => {
    detectUserCart();
  }, [currentUser]);

  function handleShowDeleteNotification(data) {
    if (products.length > data.length) {
      dispatch(showNotification("removeFromCart"));
    }
  }

  return (
    <div
      className={`${isCartOpen ? "translate-y-0" : "-translate-y-full block"}
        bg-white z-50 max-w-[1920px] flex flex-col left-0 right-0 mx-auto h-full fixed top-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center border-b border-grey">
        <div className="flex h-[72px] justify-between container items-center">
          <div className="flex items-center">
            <LocalMallOutlinedIcon
              className="mr-2"
              aria-label="Icon de cesto de compras"
            />
            <p className="font-semibold" aria-label="Cesto de compras">
              Cesto de compras
            </p>
          </div>
          <div>
            <IconButton
              ariaLabel={"Fechar cesto de compras"}
              icon={<CloseOutlinedIcon />}
              onClick={handleClickCart}
            />
          </div>
        </div>
      </div>

      <div>
        <div
          className={`${
            products.length === 0 && "absolute"
          } caption w-full py-6 shadow-md flex gap-2  `}
        >
          <div className="flex h-[72px] justify-between container items-center">
            <div className="flex items-center gap-2">
              <CheckCircleOutlineIcon className="text-primary_main text-[20px]  -translate-y-[1px]" />
              <p className="underline underline-offset-2">
                Levantamento grátis num ponto de recolha.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-grow flex-col transition-opacity duration-75 scroll_bar-invisible [&>article:last-child]:border-b-0 [&>article:first-child]:pt-0 container pt-8 ${
          loading && "opacity-20 pointer-events-none"
        }`}
      >
        {products.length > 0 && currentUser && (
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <CardCart
                  handleShowDeleteNotification={handleShowDeleteNotification}
                  handleLoading={handleLoading}
                  data={product}
                  userEmail={currentUser.email}
                  key={index}
                />
              </li>
            ))}
          </ul>
        )}

        {products.length === 0 && currentUser && (
          <div className="h-full flex flex-col justify-center items-center gap-1 mb-12">
            <NoResultsNotice
              title={"Vamos às compras?"}
              text={"Os artigos que adicionares ao cesto vão aparecer aqui."}
              icon={<LocalMallOutlinedIcon sx={{ fontSize: 60 }} />}
              btnText={"Abrir Menu"}
              onClick={() => {
                dispatch(toggleMenu()), dispatch(toggleCart());
              }}
            />
          </div>
        )}

        {products.length === 0 && !currentUser && (
          <div className="flex h-3/4 mx-auto">
            <Link href="/login" className="flex flex-col ">
              <NoResultsNotice
                title={"Estás aí?"}
                text={"Faz login para adicionares artigos ao cesto de compras."}
                icon={<LocalMallOutlinedIcon sx={{ fontSize: 60 }} />}
                btnText={"Iniciar sessão"}
                onClick={handleClickCart}
              />
            </Link>
          </div>
        )}
      </div>

      {products.length > 0 && currentUser && (
        <div className=" w-full shadow-[0px_-4px_6px_-1px_#00000010] border-grey bg-white container pb-4">
          <div className="flex my-6 justify-between">
            <div>
              <h6
                className="font-semibold"
                aria-label={`Total de ${products && products.length} ${
                  products && products.length === 1 ? "artigo" : "artigos"
                }`}
              >
                Total ({products && products.length}{" "}
                {products.length === 1 ? "artigo" : "artigos"})
              </h6>
              <div className="text-grey" aria-label="Iva Incluído">
                IVA Incluído
              </div>
            </div>
            <div>
              <h6
                className="font-semibold"
                aria-label={`Total do carrinho: ${
                  products.length > 0
                    ? getCartTotalPrice(products) + " euros"
                    : "Carrinho vazio"
                }`}
              >
                {products.length > 0 && <>{getCartTotalPrice(products)}€</>}
              </h6>
            </div>
          </div>

          <div className=" my-6 ">
            <Link href={"/shop"}>
              <Button
                onClick={() => dispatch(toggleCart())}
                type={"primary"}
                ariaLabel="Proceder com a compra"
                justify="between"
                width="full"
              >
                Proceder com a compra
                <KeyboardArrowRightIcon
                  className="translate-x-2"
                  sx={{ fontSize: 28 }}
                />
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Notification
        id={"removeFromCart"}
        type={"Neutral"}
        message={"Artigo removido"}
      />
    </div>
  );
};
