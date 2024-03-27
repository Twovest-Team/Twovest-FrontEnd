"use client";

// Importing dependencies
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import NavigationTitle from "@/components/providers/NavigationTitle";
import ShopSectionOne from "@/components/sections/ShopSectionOne";
import ShopSectionThree from "@/components/sections/ShopSectionThree";
import ShopSectionTwo from "@/components/sections/ShopSectionTwo";
import { shopStages } from "@/constants";
import getUserCartProducts from "@/utils/db/cart/getUserCartProducts";
import { updateCart } from "@/redux/slices/cartProducts";
import useAuth from "@/hooks/client-hooks/useAuth";

// Shop component
const Shop = () => {
  // State management
  const dispatch = useAppDispatch();
  const [stageState, setStageState] = useState();
  const [loading, setLoading] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const products = useAppSelector((state) => state.cartProducts.products);
  const {currentUser} = useAuth();

  // Update stage function
  function updateStage(id) {
    setStageState(shopStages.find((stage) => stage.id === id));
  }

  // Initial setup useEffect
  useEffect(() => {
    setStageState(shopStages[0]);
  }, []);

  // Handle show delete notification function
  function handleShowDeleteNotification(data) {
    if (products.length > data.length) {
      setShowDeleteNotification(true);
      setTimeout(() => {
        setShowDeleteNotification(false);
      }, 3200);
    }
  }

  // Handle loading function
  function handleLoading(boolean) {
    setLoading(boolean);
  }

  // Detect user cart useEffect
  useEffect(() => {
    detectUserCart();
  }, [currentUser]);

  // Detect user cart function
  function detectUserCart() {
    if (currentUser) {
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

  // Render component
  return (
    <main>
      <NavigationTitle titleText="Efetuar compra" />

      {stageState && (
        <section
          className={`flex flex-col gap-8 min-h-[calc(100vh-148px)] ${
            loading && "opacity-20 pointer-events-none"
          }`}
        >
          {/* Shop stage navigation */}
          <ProgressBarShop stageState={stageState} updateStage={updateStage} />

          {/* Renderiza secção apropriada consoante o stage */}
          {products.length > 0 &&
            currentUser &&
            (stageState.id === 1 ? (
              <ShopSectionOne
                handleLoading={handleLoading}
                handleShowDeleteNotification={handleShowDeleteNotification}
                productsData={products}
                userEmail={currentUser.email}
                updateStage={updateStage}
              />
            ) : stageState.id === 2 ? (
              <ShopSectionTwo
                userData={currentUser}
                updateStage={updateStage}
              />
            ) : (
              stageState.id === 3 && (
                <ShopSectionThree
                  productsData={products}
                  userData={currentUser}
                  updateStage={updateStage}
                />
              )
            ))}
        </section>
      )}
    </main>
  );
};

function ProgressBarShop({ stageState, updateStage }) {
  return (
    <div>
      <div className="container flex justify-between items-center text-secondary gap-1.5 mb-2 [&>article]:flex-1 [&>article:last-child]:text-end [&>article:nth-child(2)]:text-center [&>article]:cursor-pointer">
        {shopStages.map((stage) => (
          <article
            key={stage.id}
            onClick={
              stageState.id > stage.id ? () => updateStage(stage.id) : null
            }
            className={`
                    ${
                      stageState.id === stage.id
                        ? "text-black font-semibold"
                        : stageState.id > stage.id
                          ? "text-primary_main font-semibold"
                          : stageState.id < stage.id && "text-secondary"
                    }
                  `}
          >
            {stage.name}
          </article>
        ))}
      </div>

      <div className="container flex justify-between items-center gap-2 [&>hr]:rounded-full [&>hr]:border [&>hr]:flex-grow [&>article]:rounded-full [&>article]:w-2 [&>article]:aspect-square [&>article]:cursor-pointer">
        {shopStages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <article
              onClick={
                stageState.id > stage.id ? () => updateStage(stage.id) : null
              }
              className={`
                  ${
                    stageState.id === stage.id
                      ? "bg-black"
                      : stageState.id > stage.id
                        ? "bg-primary_main"
                        : stageState.id < stage.id && "bg-grey"
                  }
                `}
            />
            {index != 2 && (
              <hr
                className={`
                  ${
                    stageState.id > stage.id
                      ? "border-primary_main"
                      : "border-grey_opabg-grey_opacity_50"
                  }
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Shop;
