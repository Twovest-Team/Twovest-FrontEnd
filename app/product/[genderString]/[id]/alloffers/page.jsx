"use client";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import getAllOffers from "@/utils/db/getAllOffers";
import ProductOffers from "@/components/cards/ProductOfferCard";
import NavigationTitle from "@/components/providers/NavigationTitle";
import Dropdown from "./dropdownalloffers";
import { useEffect, useState } from "react";

export default function Alloffers({ params }) {
  const productId = params.id;
  const [offers, setOffers] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllOffers(productId);

        const uniqueConditions = [
          ...new Set(result.map((offer) => offer.conditions.name)),
        ];

        const uniqueColors = [
          ...new Set(result.map((offer) => offer.colors.name)),
        ];

        const uniqueSizes = [
          ...new Set(result.map((offer) => offer.sizes.size)),
        ];

        setConditions(uniqueConditions);
        setColors(uniqueColors);
        setSizes(uniqueSizes);
        setOffers(result);
      } catch (error) {
        console.error("Fetch Offers error: ", error);
      }
    };

    fetchData();
  }, [productId]);
  const filteredOffers = offers.filter((offer) => {
    if (conditions.length > 0 && !conditions.includes(offer.conditions.name)) {
      return false;
    }
    if (colors.length > 0 && !colors.includes(offer.colors.name)) {
      return false;
    }
    if (sizes.length > 0 && !sizes.includes(offer.sizes.size)) {
      return false;
    }
    return true;
  });

  const mappedOffers = conditions || colors || sizes ? filteredOffers : offers;

  return (
    <div>
      <NavigationTitle titleText="Offers" className="titlenav" />

      <div className="flex flex-row justify-center items-center mx-4 gap-4 p-2  xl:gap-4 xl:ml-48 xl:mr-48 lg:ml-32 lg:mr-32 md:ml-24 md:mr-24 sm:ml-16 sm:mr-16">
        <Dropdown
          label="Condição"
          options={conditions}
          onSelect={(selectedOption) => setConditions(selectedOption)}
        />
        <Dropdown
          label="Cor"
          options={colors}
          onSelect={(selectedOption) => setColors(selectedOption)}
        />
      <NavigationTitle titleText="Offers" />
      <div className="justify-center items-center mx-4 p-2 ">
        <div className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mt-6">
          <div id="firstClick" className="flex text-secondary">
            <label className="block font-inter text-secondary mb-2 ">
              Condição
            </label>
            <ArrowDropDownIcon className={"ml-auto text-secondary"} />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mx-4 p-2 xl:gap-4  xl:ml-48 xl:mr-48 lg:ml-32 lg:mr-32 md:ml-24 md:mr-24 sm:ml-16 sm:mr-16 ">
        <Dropdown
          label={"Tamanho"}
          options={sizes}
          onSelect={(selectedOption) => setSizes(selectedOption)}
        />
      </div>

      <ul>
        <div className="justify-center items-center mx-4 p-2 xl:ml-48 xl:mr-48 lg:ml-32 lg:mr-32 md:ml-24 md:mr-24 sm:ml-16 sm:mr-16 ">
          {mappedOffers.map((offer) => (
            <div key={offer.id} className="mb-4">
              <ProductOffers offer={offer} discount={offer.price} />
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
