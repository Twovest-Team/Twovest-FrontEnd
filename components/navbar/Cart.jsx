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
import { toggleMenu } from "@/redux/slices/menuToggle";
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
  const products = useAppSelector((state) => state.cartProducts.products);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(isCartOpen ? 'visible' : 'invisible');

  useEffect(() => {
    if (currentUser && products?.length === 0) {
      const fetchProducts = async () => {
        const data = await getUserCartProducts(currentUser.email);
        if (data) {
          dispatch(updateCart(data));
        }
      };
      fetchProducts();
    }
  }, [currentUser]);

  useEffect(() => {
    setVisibility(isCartOpen ? 'visible' : 'invisible');
    if (!isCartOpen) setTimeout(() => setVisibility('invisible'), 200);
  }, [isCartOpen]);

  const handleLoading = (boolean) => setLoading(boolean);
  const handleClose = () => dispatch(toggleCart());

  const handleShowDeleteNotification = (data) => {
    if (products?.length > data.length) {
      dispatch(showNotification("removeFromCart"));
    }
  };

  const renderTopbar = () => (
    <div className="flex justify-between items-center border-b border-grey">
      <div className="flex h-[72px] justify-between container items-center">
        <div className="flex items-center">
          <LocalMallOutlinedIcon className="mr-2" aria-label="Icon de cesto de compras" />
          <p className="font-semibold" aria-label="Cesto de compras">Cesto de compras</p>
        </div>
        <IconButton ariaLabel="Fechar cesto de compras" icon={<CloseOutlinedIcon className="text-secondary" />} onClick={handleClose} />
      </div>
    </div>
  );

  const renderProductList = () => (
    <ul className="[&>li:last-child>article]:border-b-0">
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
  );

  const renderNotice = () => (
    <div className="h-full flex flex-col justify-center items-center">
      <NoResultsNotice
        title="Vamos às compras?"
        text="Os artigos que adicionares ao cesto vão aparecer aqui."
        icon={<LocalMallOutlinedIcon sx={{ fontSize: 60 }} />}
        btnText="Abrir Menu"
        onClick={() => {
          dispatch(toggleMenu());
          dispatch(toggleCart());
        }}
      />
    </div>
  );

  const renderTotal = () => (
    <div className="w-full shadow-[0px_-4px_6px_-1px_#00000010] border-grey bg-white container pb-5">
      <div className="flex justify-between py-5">
        <div>
          <h1 className="font-semibold" aria-label={`Total de ${products?.length} ${products?.length === 1 ? "artigo" : "artigos"}`}>
            Total ({products?.length} {products?.length === 1 ? "artigo" : "artigos"})
          </h1>
          <div className="text-secondary text-caption" aria-label="Iva Incluído">IVA Incluído</div>
        </div>
        <div>
          <h2 className="font-semibold" aria-label={`Total do carrinho: ${products?.length > 0 ? getCartTotalPrice(products) + " euros" : "Carrinho vazio"}`}>
            {products?.length > 0 && <>{getCartTotalPrice(products)}€</>}
          </h2>
        </div>
      </div>
      <div>
        <Link href="/shop">
          <Button onClick={() => dispatch(toggleCart())} type="black" ariaLabel="Proceder com a compra" justify="space-between" width="100%">
            Proceder com a compra
            <KeyboardArrowRightIcon className="translate-x-2" sx={{ fontSize: 28 }} />
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <section className={`${isCartOpen ? 'visible' : 'invisible'} bg-black backdrop-blur-sm bg-opacity-30 left-0 right-0 top-0 bottom-0 fixed h-full w-full z-[98]`} onClick={handleClose} />

      <div className={`${visibility} ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex bg-white z-[99] w-full md:w-[500px] flex-col left-0 right-0 md:left-auto mx-auto h-[100dvh] fixed top-0 transition-all duration-500 delay-100`}>
        {renderTopbar()}
        <div className={`flex flex-grow flex-col transition-opacity duration-75 scroll_bar-invisible [&>article:last-child]:border-b-0 [&>article:first-child]:pt-0 container ${loading && "opacity-20 pointer-events-none"}`}>
          {products?.length > 0 && currentUser && renderProductList()}
          {products?.length === 0 && currentUser && renderNotice()}
        </div>
        {products?.length > 0 && currentUser && renderTotal()}
      </div>
    </>
  );
};
