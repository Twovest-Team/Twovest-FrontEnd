"use client";

import Image from "next/image";
import Link from "next/link";
import ProductQuantityControl from "../items/ProductQuantityControl";
import DeleteButton from "../buttons/icons/DeleteButton";
import { categories } from "@/constants";
import applyPriceDiscount from "@/utils/applyPriceDiscount";
import removeFromCart from "@/utils/db/cart/removeFromCart";
import { useDispatch } from "react-redux";
import { updateCart } from "@/redux/slices/cartProducts";
import { toggleCart } from "@/redux/slices/cartToggle";
import { useAppSelector } from "@/redux/hooks";

export const CardCart = ({
  handleShowDeleteNotification,
  data,
  userEmail,
  handleLoading,
}) => {
  const dispatch = useDispatch();
  const isCartOpen = useAppSelector(state => state.cartToggle.isOpen)
  const categoryName = categories.find(
    (element) => element.id === data.offers.products.categories.id
  ).singular;
  const discount = data.offers.products.discount;


  async function handleDeleteProduct() {
    handleLoading(true);
    const updatedCart = await removeFromCart(data.id, userEmail);
    if (updatedCart) {
      handleShowDeleteNotification(updateCart);
      dispatch(updateCart(updatedCart));
      handleLoading(false);
    }
  }

  function handleToggleCart(){
    if(isCartOpen){
      dispatch(toggleCart())
    }
  }

  return (
    <article className="py-12 border-b border-grey">
      <div className="flex self-center items-center w-full">
        <Link
          onClick={() => handleToggleCart()}
          href={`/product/${data.offers.products.gender.toLowerCase()}/${data.offers.products.id}`}

        >
          <figure className="bg-white border min-w-[115px] aspect-square border-grey rounded relative">
            <Image
              src={data.offers.images[0].url}
              width={115}
              height={115}
              alt={data.offers.images[0].alt}
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
                                ${data.offers.conditions.id === 1 &&
                  "text-primary_main"
                  }
                                ${data.offers.conditions.id === 2 &&
                  "text-info_main"
                  }
                                ${data.offers.conditions.id === 3 &&
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
