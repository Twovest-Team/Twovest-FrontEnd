"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import useGender from "@/hooks/client-hooks/useGender";
import Button from "../buttons/Button";

const ImageSwiper = () => {
  let [gender] = useGender();

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
    >
      {/*  {images.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col items-center justify-center">
            <Image src={imageUrl} width={460} height={460} className='object-cover w-full h-screen' alt={`Image ${index + 1}`} />
            <h1 className='text-center text-white font-semibold absolute'>Compra aqui Amigo!</h1>
          </div>
        </SwiperSlide>
      ))} */}

      <SwiperSlide>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={
              "https://images.pexels.com/photos/675872/pexels-photo-675872.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418"
            }
            width={460}
            height={460}
            className="object-cover w-full h-screen"
            alt={`imagem sugestiva`}
          />
          <div className="absolute text-white text-center pb-2 container">
            <p className="">Promoções</p>
            <h1 className="text_h3 font-semibold">Artigos com promoções até 50%</h1>
            <Button href={`/products/${gender.string}?status=discounts`} className="mx-auto mt-3" type={'primary'} ariaLabel='Ver Todas as Promoções'>
              Ver promoções
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={
              "https://images.pexels.com/photos/8938730/pexels-photo-8938730.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418"
            }
            width={460}
            height={460}
            className="object-cover w-full h-screen brightness-50"
            alt={`imagem sugestiva`}
          />

          <div className="absolute text-center text-white pb-10 container">
            <h1 className="text_h3 font-semibold ">Tens roupa que já não precisas?</h1>
            <h2 className="text_h5">Retorna-a nos pontos de recolha</h2>
            <Button href={`/`} className="mx-auto mt-3" type={'primary'} ariaLabel='Ver Todas as Promoções'>
              Ver pontos de recolha
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={
              "https://images.pexels.com/photos/6331230/pexels-photo-6331230.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418"
            }
            width={460}
            height={460}
            className="object-cover w-full h-screen brightness-75"
            alt={`imagem sugestiva`}
          />
          <div className="absolute text-center text-white container">
            <h1 className="font-semibold text_h3">
              Descobre aqui as melhores marcas aos melhores preços!
            </h1>
            <Link href={"/brands"}>
            <Button href={`/brands`} className="mx-auto mt-3" type={'primary'} ariaLabel='Ver Todas as Promoções'>
              Ver marcas
            </Button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSwiper;
