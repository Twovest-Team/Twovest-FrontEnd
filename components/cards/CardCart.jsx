"use client";

import Image from "next/image";
import Link from "next/link";
import ProductQuantityControl from "../items/ProductQuantityControl";
import DeleteButton from "../buttons/icons/DeleteButton";
import { categories, genders } from "@/constants";
import applyPriceDiscount from "@/utils/applyPriceDiscount";
import removeFromCart from "@/utils/db/cart/removeFromCart";
import { useDispatch } from "react-redux";
import { updateCart } from "@/redux/slices/cartProducts";
import { toggleCart } from "@/redux/slices/cartToggle";
import { useAppSelector } from "@/redux/hooks";
import getGender from "@/utils/getGender";
import getStorageImage from "@/utils/getStorageImage";
import checkIfCouponApplies from "@/utils/checkIfCouponApplies";
import useAuth from "@/hooks/client-hooks/useAuth";
import { useEffect, useState } from 'react';

export const CardCart = ({
  handleShowDeleteNotification,
  data,
  userEmail,
  handleLoading,
  coupon,
}) => {
  const dispatch = useDispatch();
  const isCartOpen = useAppSelector((state) => state.cartToggle.isOpen);
  const categoryName = categories.find(
    (element) => element.id === data.offers.products.categories.id
  ).singular;
  const discount = data.offers.products.discount;
  const { currentUser } = useAuth();
  const [couponDiscount, setCouponDiscount] = useState([]);

  async function handleDeleteProduct() {
    handleLoading(true);
    const updatedCart = await removeFromCart(data.id, userEmail);
    if (updatedCart) {
      handleShowDeleteNotification(updateCart);
      dispatch(updateCart(updatedCart));
      handleLoading(false);
    }
  }

  function handleToggleCart() {
    if (isCartOpen) {
      dispatch(toggleCart());
    }
  }


  const gender = getGender(data.offers.products.gender);
  const brandId = data.offers.products.brands.id

  
    useEffect(() => {
      if (currentUser?.id) {
          // Função para buscar os cupons do utilizador
          const couponApplies = async () => {
              try {
                if(coupon > 0) {
                  const checkCouponApplies = await checkIfCouponApplies(brandId, coupon);

                  if(checkCouponApplies.length > 0)
                    {
                      setCouponDiscount(checkCouponApplies[0].coupons.discount)
                    }
                  }
              } catch (error) {
                  console.error("Failed to check if coupon applies:", error);
              }
          };
  
          couponApplies();
      }
  }, [coupon]);
  
  
  function NormalPrice() {
    return(
      <p className="font-semibold h-8 flex items-center">
                  {data.offers.products.discount > 0 ? (
                    <>
                      {applyPriceDiscount(
                        data.offers.price,
                        data.offers.products.discount
                      )}
                    </>
                  ) : (
                    <>{data.offers.price.toFixed(2)}</>
                  )}
                  €
                </p>
    )
  }

  function CouponPrice() {

    let couponPrice = applyPriceDiscount(data.offers.price, couponDiscount)

    return(
      <p className="font-semibold h-8 flex items-center">
                  {data.offers.products.discount > 0 ? (
                    <>
                    <s className="mr-2">{applyPriceDiscount(
                        data.offers.price,
                        data.offers.products.discount
                      )}</s>
                      <b className="text-primary_main">
                      {applyPriceDiscount(
                        couponPrice,
                        data.offers.products.discount
                      )}€
                      </b>
                    </>
                  ) : (
                    <>
                    <s className="mr-2">data.offers.price  €</s>
                    <b className="text-primary_main">{couponPrice}€</b>
                    </>
                  )}
    </p>
    )
  }

  return (
    <article className="py-12 border-b border-grey">
      <div className="flex self-center items-center w-full">
        <Link
          onClick={() => handleToggleCart()}
          href={`/product/${gender.string}/${data.offers.products.id}`}
        >
          <figure className="bg-white border min-w-[115px] aspect-square border-grey rounded relative">
            <Image
              src={getStorageImage(data.offers.products.images[0].url)}
              width={115}
              height={115}
              alt={data.offers.products.images[0].alt}
            />

            <div className="absolute top-0 right-0 min-[350px]:hidden">
              <DeleteButton deleteFunction={handleDeleteProduct} />
            </div>

            {discount > 0 && (
              <div className="absolute bottom-3 bg-primary_main text-white py-1 px-2 rounded-r caption font-semibold">
                {discount} %
              </div>
            )}
          </figure>
        </Link>
        <div className="min-h-[115px] flex justify-between flex-grow min-w-0">
          <div className="ml-4 flex flex-col font-semibold justify-between min-w-0 flex-grow ">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between gap-2">
                <p className="truncate">
                  {categoryName} {data.offers.products.brands.name}
                </p>
                <div className="hidden min-[350px]:block">
                  <DeleteButton deleteFunction={handleDeleteProduct} />
                </div>
              </div>

              <p
                className={`caption
                                ${
                                  data.offers.conditions.id === 1 &&
                                  "text-primary_main"
                                }
                                ${
                                  data.offers.conditions.id === 2 &&
                                  "text-info_main"
                                }
                                ${
                                  data.offers.conditions.id === 3 &&
                                  "text-warning_main"
                                }
                            `}
              >
                {data.offers.conditions.name}
              </p>
              <p className="text-secondary font-normal caption">
                Tamanho: {data.offers.sizes.size}
              </p>
            </div>
            <div className="flex justify-between">
              {couponDiscount > 0 ? (<CouponPrice />) : (<NormalPrice />)}
              <div className="hidden min-[350px]:block">
                <ProductQuantityControl
                  cartId={data.id}
                  userEmail={userEmail}
                  qty={data.qty}
                  handleLoading={handleLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 gap-4 h-fit min-[350px]:hidden">
        <div className="w-[115px]">
          <ProductQuantityControl
            cartId={data.id}
            userEmail={userEmail}
            qty={data.qty}
            handleLoading={handleLoading}
          />
        </div>
      </div>
    </article>
  );
};



