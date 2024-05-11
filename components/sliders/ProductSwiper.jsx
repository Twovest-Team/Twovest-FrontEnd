"use client";

import Image from "next/image";
import getStorageImage from "@/utils/getStorageImage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function ProductSwiper({ images }) {
  return (
    <Swiper
      modules={[Pagination]}
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      spaceBetween={20}
      className="w-full h-full"
      id="product-page-swiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <figure className="h-full flex justify-center items-center">
            <Image
              src={getStorageImage(image.url)}
              height={406}
              width={304}
              alt={image.alt}
              className="mx-auto"
            />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
