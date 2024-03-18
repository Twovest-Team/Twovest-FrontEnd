/*
    <div className="flex">
  <Carousel
    items={[
      { title: "Artigos com promoções até 20% sadasdsadasdasd", subtitle: "Promoções", image: "https://images.pexels.com/photos/675872/pexels-photo-675872.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418" },
      { title: "Artigos com promoções até 20% sadasdsadasdasd", subtitle: "Promoções", image: "https://images.pexels.com/photos/8938730/pexels-photo-8938730.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418" },
      { title: "Artigos com promoções até 20% sadasdsadasdasd", subtitle: "Promoções", image: "https://images.pexels.com/photos/6331230/pexels-photo-6331230.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418" },
    ]}
    autoplayInterval={5000}
  />
</div>

*/
"use client";

import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Buttons } from "@/components/buttons/Buttons";
import Image from "next/image";
const Carousel = ({ items, autoplayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrev() {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  }

  function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }

  function handleRadioChange(index) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, autoplayInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, autoplayInterval]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Transition
        as="div"
        className="h-full"
        show={true}
        enter="transition-all ease-in-out duration-500 "
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative ">
          <Image
            className="resize object-cover w-[460px] h-full opacity-90 transition-transform duration-500 transform scale-100"
            src={items[currentIndex].image}
            alt={items[currentIndex].title}
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute top-1/4 text-center text-white w-full mx-auto overflow-hidden cenas">
            <p className="font-inter whitespace-normal font-bold break-words">
              {items[currentIndex].subtitle}
            </p>
            <h2 className="font-inter whitespace-normal font-bold mt-4 break-words">
              {items[currentIndex].title}
            </h2>
            <div className="w-6/12 h-1/3 mx-auto m-10 items-center justify-center btn-temp">
              <Buttons
                btnState="defaultMain"
                text="Ver Todas as Promoções"
                btnSize="mediumSizeSocials"
              />
            </div>
            <div className="mt-8 flex gap-4 items-center justify-center">
              {items.map((_, index) => (
                <div className="relative" key={index}>
                  {index === currentIndex ? (
                    <button
                      className={`w-12 h-5 bg-primary_main rounded-full rBTN2`}
                      onClick={() => handleRadioChange(index)}
                    ></button>
                  ) : (
                    <button
                      className={`w-3 h-3 bg-white rounded-full rBTN`}
                      onClick={() => handleRadioChange(index)}
                    ></button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Carousel;
