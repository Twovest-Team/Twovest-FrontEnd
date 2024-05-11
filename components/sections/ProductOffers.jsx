"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductOfferCard from "../cards/ProductOfferCard";
import Button from "../buttons/Button";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { getBestOffers, sortOffers } from "@/utils/handleOffers";
import { useState } from "react";
const ProductOffers = ({ offers, discount, productGender, productId }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const sortedOffers = sortOffers(offers);
  const bestOffers = getBestOffers(sortedOffers);
  const dispatch = useAppDispatch();

  const filterOffers = () => {
    return bestOffers.filter((offer) => {
      if (selectedColor && selectedSize) {
        return (
          offer.colors.name === selectedColor &&
          offer.sizes.size === selectedSize
        );
      } else if (selectedColor) {
        return offer.colors.name === selectedColor;
      } else if (selectedSize) {
        return offer.sizes.size === selectedSize;
      }
      return true; // No filter applied, return all bestOffers
    });
  };

  const filteredOffers = filterOffers();

  // Unique keys for the color options
  const colorOptions = [...new Set(offers.map((offer) => offer.colors.name))];
  // Unique keys for the size options
  const sizeOptions = [...new Set(offers.map((offer) => offer.sizes.size))];

  return (
    <div className="container flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text_h6">
          {offers.length > 3 ? "Melhores ofertas" : "Ofertas"}
        </h1>
        <p className="text-secondary">
          {filteredOffers.length}
          {filteredOffers.length > 1 ? " ofertas no total" : " oferta no total"}
        </p>
      </div>

      <div className="flex gap-3">
        <select
          className="w-1/2 text-left px-6 py-4 border border-grey bg-white rounded flex items-end justify-between"
          value={selectedColor || ""}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">Podes filtrar por cor</option>
          {colorOptions.map((color) => (
            <option key={`color-${color}`} value={color}>
              {color}
            </option>
          ))}
        </select>

        <select
          className="w-1/2 text-left px-6 py-4 border border-grey bg-white rounded flex items-end justify-between"
          value={selectedSize || ""}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Podes filtrar por tamanho</option>
          {sizeOptions.map((size) => (
            <option key={`size-${size}`} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-6">
        {filteredOffers.map((offer) => (
          <ProductOfferCard
            key={`${offer.product_id}-${offer.colors.name}`}
            offer={offer}
            discount={discount}
          />
        ))}
        {/* Display message if no matching offers are found */}
        {filteredOffers.length === 0 && (
          <p>Nenhuma oferta corresponde aos filtros selecionados.</p>
        )}
      </div>
      {offers.length > 2 && (
        <div>
          <Button
            className="md:hidden"
            onClick={() => dispatch(openModal("offersProduct"))}
            type={"primary"}
            ariaLabel={`Ver todas as ${offers.length} ofertas`}
            width="full"
          >
            Ver todas as ofertas ({offers.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductOffers;
