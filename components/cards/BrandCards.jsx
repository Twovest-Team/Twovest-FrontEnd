import getStorageImage from "@/utils/getStorageImage";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <h1 className="font-semibold mb-4 text_h6">Marcas</h1>
      <ul
        className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5 lg:grid-cols-4 ${numBrandsToShow} `}
      >
        {brand.slice(0, numBrandsToShow).map((item) => (
          <li key={item.id}>
            <Link key={item.id} href={`/brands/${gender.string}/${item.name}`}>
              <div className="bg-grey_opacity_50 p-6 2xl:px-7 2xl:py-16 hover:brightness-[.85] text-center rounded hover:transition hover:ease-in-out hover:delay-200 transition delay-200 ease-in-out">
                <Image
                  src={getStorageImage(item.logo_url_without_background)}
                  width={150}
                  height={150}
                  alt={`logotipo ${item.name}`}
                  className="mx-auto"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={"/brands"} className="text-right font-semibold ">
        <div className="my-4 text-right">Ver todas as marcas -&gt;</div>
      </Link>
    </div>
  );
};
