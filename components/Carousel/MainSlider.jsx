"use client";

import Image from "next/image";
import Button from "../buttons/Button";
import { useEffect, useRef } from "react";
import { register } from 'swiper/element/bundle';
import { genders } from "@/constants";
import { useRouter } from "next/navigation";
register();

const MainSlider = ({ currentGender }) => {

  const slides = [
    [
      {
        image: '/static/images/slider/image_women_1.webp',
        note: 'Descobre a moda que combina com a tua personalidade.',
        title: <span>Visita a Galeria <br /> de Mulher.</span>,
        description: 'Partilha os teus looks com outras pessoas.',
        btnText: 'Ir para Galeria ->',
        btnLink: `/women/gallery`
      },
      {
        image: '/static/images/slider/image_women_2.webp',
        note: 'A autenticidade que procuras num só lugar.',
        title: <span>Artigos até 50% <br /> de desconto</span>,
        description: 'Delicia-te com os novos artigos disponíveis.',
        btnText: 'Ver promoções ->',
        btnLink: `/women/products?status=discounts`
      },
    ],
    [
      {
        image: '/static/images/slider/image_men_1.webp',
        note: 'O teu estilo, a nossa paixão.',
        title: <span>Visita a Galeria <br /> de Homem.</span>,
        description: 'Partilha os teus looks com outras pessoas.',
        btnText: 'Ir para Galeria ->',
        btnLink: `/men/gallery`
      },
      {
        image: '/static/images/slider/image_men_2.webp',
        note: 'A autenticidade que procuras num só lugar.',
        title: <span>Artigos até 50% <br /> de desconto</span>,
        description: 'Delicia-te com os novos artigos disponíveis.',
        btnText: 'Ver promoções ->',
        btnLink: `/men/products?status=discounts`
      },
    ]

  ]

  const router = useRouter()
  const swiperRef = useRef()

  const handleGender = (selectedGender) => {
    if(currentGender.id !== selectedGender.id) router.push(`/${selectedGender.string}`)
  }

  useEffect(() => {
    const swiperEl = swiperRef.current;

    const params = {
      pagination: {
        clickable: true
      },
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

      {genders.map(gender => (
        <button
          key={gender.id}
          onClick={() => handleGender(gender)}
          className={`
          ${currentGender.id !== gender.id ? 'bg-opacity-60 backdrop-blur-sm' : ''} 
          flex w-1/2 justify-center items-center bg-black text-white text-caption font-semibold uppercase
        `}>
          {gender.stringPT}
        </button>
      ))}

    </div>
  )

  const renderSlides = () => {

    return slides[currentGender.id].map((slide, index) => (
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
                <div className="text-white text-caption sm:text-base opacity-90 text-sm font-semibold text-center">{slide.note}</div>
              </div>

              <h1 className="text-[11vw] sm:text-[64px] font-bold text-center leading-tight">{slide.title}</h1>
              <p className="text-caption sm:text-base text-center font-semibold">{slide.description}</p>
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

      <div className='mainSliderSwiper relative'>

        {renderGenders()}

        <swiper-container ref={swiperRef} init='false'>
          {renderSlides()}
        </swiper-container>

      </div>
    </>
  )

};

export default MainSlider;
