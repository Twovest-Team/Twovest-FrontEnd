'use client'

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductOfferCard from "../cards/ProductOfferCard";
import Button from "../buttons/Button";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { getBestOffers, sortOffers } from "@/utils/handleOffers";
import useWindow from "@/hooks/client-hooks/useWindow";
import { useState } from "react";

const ProductOffers = ({ offers, discount }) => {

  const [limit, setLimit] = useState(2)

  const sortedOffers = sortOffers(offers);
  const bestOffers = getBestOffers(sortedOffers, limit);
  const dispatch = useAppDispatch()
  const { isLg, isXl, is2Xl } = useWindow()

  const renderTitle = () => {
    return (
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <h1 className="font-semibold text_h6">
          {offers.length > 3 ? "Melhores ofertas" : "Ofertas"}
        </h1>
        <p className="text-secondary">
          {bestOffers.length}
          {offers.length > 2
            ? ` de ${offers.length} ofertas`
            : offers.length == 2
              ? " ofertas no total"
              : offers.length === 1 && " oferta no total"}
        </p>
      </div>
    )
  }

  const renderFilters = () => {
    return (
      <div className="flex gap-3">
        <button className="w-1/2 text-left px-6 py-4 border border-grey rounded flex items-end justify-between">
          Cor
          <KeyboardArrowDownIcon />
        </button>

        <button className="w-1/2 text-left px-6 py-4 border border-grey rounded flex items-end justify-between">
          Tamanho
          <KeyboardArrowDownIcon />
        </button>
      </div>
    )
  }

  const renderBtn = () => {

    const handleClick = () => {
      if (!isLg, !isXl, !is2Xl) {
        dispatch(openModal('offersProduct'))
      }else{
       setLimit(4)
      }
    }

    if(limit >= offers.length) return null

    return (
      <Button
        onClick={handleClick}
        ariaLabel="Ver mais ofertas disponíveis"
        type="black"
        width="full"
      >
        <p className="lg:hidden">Ver todas as ofertas ({offers.length})</p>
        <p className="hidden lg:block">Carregar mais ofertas</p>
      </Button>
    )
  }

  const renderCards = () => {
    return (
      <div className="flex flex-col gap-6">
        {bestOffers.map((offer, index) => (
          <ProductOfferCard key={index} offer={offer} discount={discount} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {renderTitle()}

      {renderFilters()}

      {renderCards()}

      {offers.length > 2 && renderBtn()}
    </div>
  );
};



export default ProductOffers;
