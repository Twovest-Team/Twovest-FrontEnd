"use client";

import getLocalStorage from "@/utils/localStorage/getLocalStorage";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";

const BrandsList = ({ brandsData }) => {
  let currentGender;

  if (typeof window !== "undefined") {
    currentGender = getLocalStorage("gender");
  }

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

      <section className="grid grid-cols-2 grid-cols-desktop gap-6">
        {filteredBrands.map((brandItem, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between"
          >
            <div
              className={`w-full aspect-square bg-grey_opacity_50 rounded flex items-center justify-center`}
            >
            <div className="">
              <Link href={`/brands/${currentGender}/${brandItem.name}`}>
                <Image
                  src={brandItem?.logo_url_without_background}
                  width={144}
                  height={144}
                  alt={brandItem.name}
                />
              </Link>
            </div>
        </div>
            <p
              key={index}
              className="grid mt-2 font-semibold justify-center text-center"
            >
              {brandItem.name}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default BrandsList;
