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
      className="product-swiper w-full h-full"
      id="product-page-swiper"
    >
      {images.map((image, index) => (
        <SwiperSlide className="product-slider" key={index}>
          <Image
            src={getStorageImage(image.url)}
            height={406}
            width={304}
            alt={image.alt}
            className="mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
