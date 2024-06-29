"use client";

import { useEffect, useRef } from "react";
import NavigationTitle from "../providers/NavigationTitle";
import SustainableButton from "@/components/buttons/icons/SustainableButton";
import Image from "next/image";
import Link from "next/link";
import getStorageImage from "@/utils/getStorageImage";
import useScroll from "@/hooks/client-hooks/useScroll";
import useWindow from "@/hooks/client-hooks/useWindow";

const ProductNav = ({ productGender, is_sustainable, discount, brand }) => {

  const ref = useRef();
  const imageRef = useRef();
  const [scrollX, scrollY] = useScroll()
  const { isLg, isXl, is2Xl } = useWindow()

  const updateStyles = () => {
    if (window.scrollY > 0) {
      ref.current.classList.add("bg-white");
      ref.current.classList.remove("bg-none");
      ref.current.classList.add("shadow-md");
      if(imageRef.current) imageRef.current.classList.remove("hidden");
    } else {
      ref.current.classList.remove("bg-white");
      ref.current.classList.add("bg-none");
      ref.current.classList.remove("shadow-md");
      if(imageRef.current) imageRef.current.classList.add("hidden");
    }
  }

  useEffect(() => {
    if(ref.current) updateStyles();
  }, [scrollY]);


  const renderBrand = () => {
    return (
      <Link ref={!isLg && !isXl && !is2Xl ? imageRef : null} className="flex gap-3.5 items-center" href={`/${productGender}/brands/${brand.name}`}>
        
        <figure className="relative h-9 w-9 lg:h-10 lg:w-10">
        <Image
          src={getStorageImage(brand.logo_url)}
          fill={true}
          alt={brand.name}
          className="rounded-full shadow-md transition-all duration-300"
        />

        </figure>
        
        <div className="hidden sm:block">
          <p className="font-semibold">{brand.name}</p>
          <p className="text-caption text-secondary">{brand.totalItems} artigos</p>
        </div>
      </Link>
    )
  }

  const renderSustainable = () => {
    return (
      <>
        {is_sustainable && <SustainableButton color="#05CE86" type="normal" width={35} />}
      </>
    )
  }

  const renderDiscount = () => {
    return (
      <>
        {discount > 0 && (
          <div className="px-6 py-2.5 text-white flex justify-center items-center bg-primary_main rounded-full font-semibold text-caption">
            {discount}% OFF
          </div>
        )}
      </>
    )
  }


  return (
    <div ref={ref} className="top-[75px] w-full z-20 fixed transition-all duration-300">
      <NavigationTitle>

        <div className=" flex justify-between w-full">
          
          <span className="hidden lg:block">
            {renderBrand()}
          </span>

          <div className="flex flex-row w-fit gap-3 items-center">
            {renderSustainable()}
            {renderDiscount()}
          </div>

          <span className="lg:hidden">
            {renderBrand()}
          </span>
        </div>



      </NavigationTitle>
    </div>
  );
};

export default ProductNav;
