"use client";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import applyPriceDiscount from "@/utils/applyPriceDiscount";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function ProductsFiltered({ offers, discount, product, productCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openOffer, setOpenOffer] = useState({});

  function handleCloseModal() {
    setOpenOffer({});
    setIsOpen(false);
  }

  let openOfferColor = "stone";

  if (openOffer?.id) {
    switch (openOffer.conditions.id) {
      case 1:
        openOfferColor = "green";
        break;
      case 2:
        openOfferColor = "blue";
        break;
      case 3:
        openOfferColor = "orange";
        break;
    }
  }

  return (
    <>
      {offers.map((offer) => {
        let color;

        function handleModalOpen() {
          setOpenOffer(offer);
          setIsOpen(true);
        }

        switch (offer.conditions.id) {
          case 1:
            color = "bg-primary_main";
            break;
          case 2:
            color = "bg-info_main";
            break;
          case 3:
            color = "bg-warning_main";
            break;
        }
        return (
          <>
            <div
              key={offer.id}
              className="p-6 px-6 flex-col justify-center items-center gap-6 inline-flex"
              onClick={handleModalOpen}
            >
              <div className="w-[342px] h-[146px] px-6 py-7 bg-white rounded-[5px] border border-stone-300 flex-col justify-center items-center gap-5 inline-flex">
                <div className="w-[342px] px-6 justify-between items-center inline-flex">
                  <div className="justify-center items-center gap-2 flex">
                    <div className={`w-3 h-3 ${color} rounded-full`} />
                    <div className="justify-start items-center gap-3 flex">
                      <div className="text-black text-base font-semibold leading-snug">
                        {offer.conditions.name}
                      </div>
                    </div>
                  </div>
                  <div className="justify-end items-center gap-2 flex">
                    {discount > 0 && (
                      <p className="text-secondary line-through">
                        {offer.price.toFixed(2)}€
                      </p>
                    )}
                    <p>{applyPriceDiscount(offer.price, discount)}€</p>
                  </div>
                </div>
                <div className="self-stretch justify-between items-center inline-flex">
                  <div className="h-[38px] justify-start items-center gap-3 flex">
                    <div className="px-3 py-2 bg-white rounded-[5px] border border-stone-300 justify-start items-center gap-2 flex">
                      <div className="text-center text-neutral-400 text-base font-normal leading-snug">
                        {offer.colors.name}
                      </div>
                    </div>
                    <div className="px-3 py-2 bg-white rounded-[5px] border border-stone-300 justify-start items-center gap-3 flex">
                      <div className="text-center text-neutral-400 text-base font-normal leading-snug">
                        {offer.sizes.size}
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-[5px] flex-col justify-center items-center inline-flex">
                    <ShoppingBagIcon className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}

      {isOpen && (
        <div className="fixed inset-0 flex overflow-y-hidden items-center justify-center transition-transform duration-600 ease-in-out">
          <div className="fixed inset-0 bg-black bg-opacity-20"></div>
          <div
            className={`bg-white w-full p-8 rounded fixed bottom-0 transform translate-y-0 transition-transform h-auto`}
          >
            <div className="flex justify-end mb-8">
              <CloseIcon
                className="cursor-pointer"
                onClick={handleCloseModal}
              />
            </div>

            <div className="w-[400px] justify-between items-center inline-flex">
              <h1 className="font-inter font-semibold text-h6">
                {productCategory.singular}
              </h1>
              <div className="flex justify-end gap-3">
                {discount > 0 && (
                  <p className="text-secondary line-through">
                    {openOffer.price.toFixed(2)}€
                  </p>
                )}
                <p>{applyPriceDiscount(openOffer.price, discount)}€</p>
              </div>
            </div>
            <div className="flex py-3">
              <div className="mr-5 px-3 py-2 bg-white rounded-[5px] border border-stone-300 justify-start items-center gap-2 flex">
                <div className="text-center text-neutral-400 text-base font-normal leading-snug">
                  {openOffer.colors.name}
                </div>
              </div>
              <div className="mr-5 px-3 py-2 bg-white rounded-[5px] border border-stone-300 justify-start items-center gap-3 flex">
                <div className="text-center text-neutral-400 text-base font-normal leading-snug">
                  {openOffer.sizes.size}
                </div>
              </div>
              <div className="px-3 py-2 bg-white rounded-[5px] border border-stone-300 justify-start items-center gap-3 flex">
                <div className="text-center text-neutral-400 text-base font-normal leading-snug">
                  {openOffer.conditions.name}
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="px-3 py-5 bg-white rounded-[5px] border border-stone-300 justify-between items-center gap-3 flex">
                <div className="flex gap-3 ml-4">
                  <EnergySavingsLeafIcon className="text-emerald-500" />
                  <p className="text-neutral-400">Artigo Sustentável</p>
                </div>
                <div className="mr-4">
                  <p className="text-emerald-500">+200 pontos</p>
                </div>
              </div>
            </div>
            <div className="py-3 gap-3 flex justify-between">
              <div className="w-[360px] h-12 bg-emerald-500 rounded-[5px] flex-col justify-center items-center inline-flex">
                <p className="text-white">Comprar agora</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-[5px] flex-col justify-center items-center inline-flex">
                <ShoppingBagIcon className="text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsFiltered;
