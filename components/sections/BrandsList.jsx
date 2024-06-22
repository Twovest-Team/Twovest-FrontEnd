"use client";

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useGender from "@/hooks/client-hooks/useGender";
import BrandCard from "../cards/BrandCard";

const BrandsList = ({ brandsData }) => {

  const [gender] = useGender();
  const [filteredBrands, setFilteredBrands] = useState(brandsData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();

    const filteredBrands = brandsData.filter((item) =>
      item.name.toLowerCase().includes(term)
    );

    setFilteredBrands(filteredBrands);
  };

  return (
    <>
      <div className="relative w-full">
        <input
          className="pl-14 w-full h-[56px] border border-grey rounded"
          onChange={handleSearch}
          placeholder="Pesquisa"
          type="text"
        />
        <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none" />
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gender && filteredBrands.map((brandItem, index) => (
          <li key={index}>
            <BrandCard key={index} genderString={gender.string} brand={brandItem} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default BrandsList;
