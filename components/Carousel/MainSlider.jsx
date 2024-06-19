"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../buttons/Button";
import { useEffect, useRef } from "react";
import imgtest from '@/public/static/images/slider/image_women_1.png'

import { register } from 'swiper/element/bundle';
register();

const MainSlider = () => {

  const slides = [
    {
      image: '/static/images/slider/image_women_1.png',
      note: 'A autenticidade que procuras num só lugar.',
      title: <span>Artigos até 50% <br /> de desconto.</span>,
      description: 'Delicia-te com os novos artigos disponíveis .',
      btnText: 'Ver promoções ->',
      btnLink: `/products/women?status=discounts`
    },
    {
      image: '/static/images/slider/image_men_1.jpg',
      note: 'A autenticidade que procuras num só lugar.', 
      title: <span>Visita a Galeria <br /> de Mulher</span>,
      description: 'Delicia-te com os novos artigos disponíveis .',
      btnText: 'Ver promoções ->',
      btnLink: `/products/women?status=discounts`
    }
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
      speed: 1000,
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

  const renderSlides = () => {

    return slides.map(slide => (
      <swiper-slide>
        <div className="w-full h-full relative">
          <Image
            className="object-cover"
            priority={true}
            quality={100}
            fill={true}
            src={slide.image}
            alt="test" />

          <div className="absolute bottom-32 z-20 left-0 right-0 mx-auto w-fit text-white flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-5">

              <div className="w-fit px-6 py-3 bg-neutral-400 bg-opacity-40 rounded-full backdrop-blur-sm flex-col justify-center items-center gap-2 inline-flex">
                <div className="text-white opacity-90 text-sm font-semibold">{slide.note}</div>
              </div>

              <h1 className="text-[64px] font-bold text-center leading-tight">{slide.title}</h1>
              <p className="text-center font-semibold">{slide.description}</p>
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

      <div className='mainSliderSwiper min-h-screen relative'>

        <div className="w-full h-10 flex absolute top-0 z-10 left-0 right-0">
          <button className="flex w-1/2 justify-center items-center bg-black text-white caption font-semibold">MULHER</button>
          <button className="pt-1 flex w-1/2 justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm text-white caption font-semibold">HOMEM</button>
        </div>

        <swiper-container ref={swiperRef} init='false'>
          {renderSlides()}
        </swiper-container>

      </div>
    </>
  )

};

export default MainSlider;
