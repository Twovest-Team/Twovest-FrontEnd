"use client";

import { CardCart } from "../cards/CardCart";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartToggle";
import { useEffect, useState } from "react";
import getUserCartProducts from "@/utils/db/cart/getUserCartProducts";
import { updateCart } from "@/redux/slices/cartProducts";
import getCartTotalPrice from "@/utils/getCartTotalPrice";
import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toggleMenu } from "@/redux/slices/menuToggle";
import Notifications from "../modals/Notifications";
import { Buttons } from "../buttons/Buttons";
export const Cart = () => {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((state) => state.cartToggle.isOpen);
  let products = useAppSelector((state) => state.cartProducts.products);
  const currentUser = useAppSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);

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
      setShowDeleteNotification(true);
      setTimeout(() => {
        setShowDeleteNotification(false);
      }, 3200);
    }
  }

  return (
    <div
      className={`${isCartOpen ? "translate-y-0" : "-translate-y-full block"}
        bg-white z-50 max-w-[460px] flex flex-col left-0 right-0 mx-auto h-screen fixed top-0 transition-transform duration-300 ease-in-out`}
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
            <Buttons
              aria-label="Fechar Cesto de compras"
              btnState=""
              text=""
              icon="closeOutline"
              btnSize="newIconSet2"
              onClick={handleClickCart}
            ></Buttons>
          </div>
        </div>
      </div>

      <div>
        <div
          className={`${
            products.length === 0 && "absolute"
          } caption container py-6 shadow-md flex gap-2 items-center`}
        >
          <CheckCircleOutlineIcon className="text-primary_main text-[20px] -translate-y-[1px]" />
          <p
            className="underline underline-offset-2 "
            aria-label="Levantamento grátis em um ponto de recolha."
          >
            Levantamento grátis em um ponto de recolha.
          </p>
        </div>
      </div>

      <div
        className={`flex flex-grow flex-col transition-opacity duration-75 scroll_bar-invisible [&>article:last-child]:border-b-0 [&>article:first-child]:pt-0 container pt-8 ${
          loading && "opacity-20 pointer-events-none"
        }`}
      >
        {products.length > 0 && currentUser && (
          <>
            {products.map((product, index) => (
              <CardCart
                handleShowDeleteNotification={handleShowDeleteNotification}
                handleLoading={handleLoading}
                data={product}
                userEmail={currentUser.email}
                key={index}
              />
            ))}
          </>
        )}

        {products.length === 0 && currentUser && (
          <div className="h-full flex flex-col justify-center items-center gap-1 mb-12">
            <LocalMallOutlinedIcon
              sx={{ fontSize: 60 }}
              className="text-[60px] mb-4"
            />
            <h6 className="font-semibold" aria-label="Cesto de compras">
              Cesto de compras
            </h6>
            <p
              className="text-center text-secondary mb-4 max-w-[230px]"
              aria-label=" Os artigos que adicionares ao cesto irão aparecer aqui."
            >
              Os artigos que adicionares ao cesto irão aparecer aqui.
            </p>

            <Buttons
              ariaLabel="Abrir menu"
              btnState="blackMain"
              text="Abrir menu"
              icon=""
              btnSize="modelSize3"
              onClick={() => {
                dispatch(toggleMenu()), dispatch(toggleCart());
              }}
            ></Buttons>
          </div>
        )}

        {products.length === 0 && !currentUser && (
          <div className="h-full flex flex-col justify-center items-center gap-1 mb-12">
            <LocalMallOutlinedIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h6 className="font-semibold" aria-label="Estás ai?">
              Estás aí?
            </h6>
            <p
              className="text-center text-secondary mb-4 max-w-[230px]"
              area-label="Inicia sessão para comprar artigos."
            >
              Inicia sessão para comprar artigos.
            </p>

            <Link href={"/login"}>
              <Buttons
                ariaLabel="Iniciar sessão"
                btnState="blackMain"
                text="Iniciar sessão"
                icon=""
                btnSize="modelSize3"
                onClick={() => dispatch(toggleCart())}
              ></Buttons>
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
              <Buttons
                ariaLabel="Proceder com a compra"
                btnState="defaultMain"
                text="Proceder com a compra"
                icon="nextStart"
                btnSize="menuSize2"
                onClick={() => dispatch(toggleCart())}
              ></Buttons>
            </Link>
          </div>
        </div>
      )}

      {showDeleteNotification && (
        <Notifications type={"Neutral"} message={"Artigo removido"} />
      )}
    </div>
  );
};
