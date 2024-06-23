"use client";

import Image from "next/image";
import Button from "../buttons/Button";
import { useEffect, useRef } from "react";
import { register } from 'swiper/element/bundle';
import useGender from "@/hooks/client-hooks/useGender";
import { genders } from "@/constants";
register();

const MainSlider = () => {

  const [gender, setGender] = useGender()
  console.log(gender)

  const slides = [
    [
      {
        image: '/static/images/slider/image_women_1.webp',
        note: 'A autenticidade que procuras num só lugar.',
        title: <span>Artigos até 50% <br /> de desconto.</span>,
        description: 'Delicia-te com os novos artigos disponíveis .',
        btnText: 'Ver promoções ->',
        btnLink: `/products/women?status=discounts`
      },
      {
        image: '/static/images/slider/image_women_2.webp',
        note: 'A autenticidade que procuras num só lugar.',
        title: <span>Visita a Galeria <br /> de Mulher</span>,
        description: 'Delicia-te com os novos artigos disponíveis .',
        btnText: 'Ver promoções ->',
        btnLink: `/products/women?status=discounts`
      },
    ],
    [
      {
        image: '/static/images/slider/image_men_1.webp',
        note: 'A autenticidade que procuras num só lugar.',
        title: <span>Artigos até 50% <br /> de desconto.</span>,
        description: 'Delicia-te com os novos artigos disponíveis .',
        btnText: 'Ver promoções ->',
        btnLink: `/products/women?status=discounts`
      },
      {
        image: '/static/images/slider/image_men_2.webp',
        note: 'A autenticidade que procuras num só lugar.',
        title: <span>Visita a Galeria <br /> de Homem</span>,
        description: 'Delicia-te com os novos artigos disponíveis .',
        btnText: 'Ver promoções ->',
        btnLink: `/products/women?status=discounts`
      },
    ]

  ]

  const swiperRef = useRef()

  useEffect(() => {
    const swiperEl = swiperRef.current;

    const params = {
      pagination: true,
      loop: true,
      autoplay: {
        delay: 5000
      },
      speed: 600,
      injectStyles: [
        `
        .swiper-pagination{
          bottom: 3rem !important;
        }

        .swiper-pagination-bullet{
          background: white;
          opacity: 60%;
          width: 60px;
          height: 5px;
          border-radius: 2px;
        }

        .swiper-pagination-bullet-active{
          opacity: 100%;
        }

        `
      ]
    }

    Object.assign(swiperEl, params)
    swiperEl.initialize()
  }, [])

  const renderGenders = () => (
    <div className="w-full h-10 flex absolute top-0 z-10 left-0 right-0">

      <button
        onClick={() => setGender(genders[0])}
        className={`
          ${gender.id !== 0 ? 'bg-opacity-60 backdrop-blur-sm' : ''} 
          flex w-1/2 justify-center items-center bg-black text-white caption font-semibold uppercase
        `}>
        {genders[0].stringPT}
      </button>

      <button
        onClick={() => setGender(genders[1])}
        className={`
        ${gender.id !== 1 ? 'bg-opacity-60 backdrop-blur-sm' : ''} 
        pt-1 flex w-1/2 justify-center items-center bg-black text-white caption font-semibold uppercase
      `}>
        {genders[1].stringPT}
      </button>
    </div>
  )

  const renderSlides = () => {

    return slides[gender.id].map((slide, index) => (
      <swiper-slide key={index}>
        <div className="w-full h-full relative">
          <Image
            className="object-cover bg-grey_opacity_50"
            priority={true}
            quality={100}
            fill={true}
            src={slide.image}
            alt="test" />

          <div className="absolute bottom-0 top-0 my-auto sm:bottom-32 sm:top-auto z-20 left-0 right-0 mx-auto w-fit text-white flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-5 px-2">

              <div className="w-fit px-6 py-3 bg-neutral-400 bg-opacity-40 rounded-full backdrop-blur-sm flex-col justify-center items-center gap-2 inline-flex">
                <div className="text-white caption sm:text-base opacity-90 text-sm font-semibold text-center">{slide.note}</div>
              </div>

              <h1 className="text-[11vw] sm:text-[64px] font-bold text-center leading-tight">{slide.title}</h1>
              <p className="caption sm:text-base text-center font-semibold">{slide.description}</p>
            </div>

            <Button ariaLabel={slide.btnText} href={slide.btnLink} type="white">
              {slide.btnText}
            </Button>
          </div>

          <div className="absolute z-10 left-0 right-0 bottom-0 w-full h-4/5 from-black bg-gradient-to-t" />
        </div>

      </swiper-slide>
    ))
  }

  return (
    <>

      <div className='mainSliderSwiper min-h-svh relative'>

        {renderGenders()}

        <swiper-container ref={swiperRef} init='false'>
          {renderSlides()}
        </swiper-container>

      </div>
    </>
  )

};

export default MainSlider;
