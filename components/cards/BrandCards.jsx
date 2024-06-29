'use client'

import { useEffect, useState } from "react";
import BrandCard from "./BrandCard";
import Button from "../buttons/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const BrandCards = ({ data, gender }) => {
  const [numBrandsToShow, setNumBrandsToShow] = useState(8);

  useEffect(() => {
    const updateNumBrands = () => {
      if (window.innerWidth < 768) {
        setNumBrandsToShow(4);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setNumBrandsToShow(9);
      } else if (window.innerWidth >= 1024) {
        setNumBrandsToShow(8);
      }
    };

    updateNumBrands();

    window.addEventListener("resize", updateNumBrands);
    return () => {
      window.removeEventListener("resize", updateNumBrands);
    };
  }, []);

  const brand = data;
  //console.log(data)

  return (
    <div className="container">
      <h1 className="font-semibold mb-4 text-h6">Marcas</h1>
      <ul
        className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5 lg:grid-cols-4 ${numBrandsToShow} `}
      >
        {brand.slice(0, numBrandsToShow).map((item) => (
          <li key={item.id}>
            <BrandCard brand={item} genderString={gender.string} />
          </li>
        ))}
      </ul>

      <div className="md:w-[18rem] ml-auto mt-10">
        <Button
          type="black-outlined"
          ariaLabel="Ir para a Galeria de Looks"
          width="100%"
          justify="space-between"
          href={`/brands`}
        >
          <span>Ver todas as marcas</span>
          <KeyboardArrowRightIcon
            className="translate-x-2"
            sx={{ fontSize: 28 }}
          />
        </Button>
      </div>

    </div>
  );
};
