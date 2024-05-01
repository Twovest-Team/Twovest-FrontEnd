'use client'

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductOfferCard from "../cards/ProductOfferCard";
import Button from "../buttons/Button";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { getBestOffers, sortOffers } from "@/utils/handleOffers";

const ProductOffers = ({ offers, discount, productGender, productId }) => {
  const sortedOffers = sortOffers(offers);
  const bestOffers = getBestOffers(sortedOffers);
  const dispatch = useAppDispatch()

  console.log(offers)
  return (
    <div className="container flex flex-col gap-6">
      <div className="flex flex-col gap-1">
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

      <div className="flex flex-col gap-6">
        {bestOffers.map((offer, index) => (
          <ProductOfferCard key={index} offer={offer} discount={discount} />
        ))}
      </div>

      {offers.length > 2 && (
        <Button
          className="md:hidden"
          onClick={() => dispatch(openModal('offersProduct'))}
          type={'black'}
          ariaLabel={`Ver todas as ${offers.length} ofertas`}
          width='full'
        >
          Ver todas as ofertas ({offers.length})
        </Button>
      )}

      <Button
        className="hidden md:block"
        type={'black'}
        ariaLabel={`Ver todas as ${offers.length} ofertas`}
        width='full'
      >
          Dummy button, change later
      </Button>
    </div>
  );
};



export default ProductOffers;
