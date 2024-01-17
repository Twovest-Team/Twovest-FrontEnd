"use client"

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';



const ImageSwiper = () => {
  const images = [
    'https://images.pexels.com/photos/675872/pexels-photo-675872.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418',
    'https://images.pexels.com/photos/8938730/pexels-photo-8938730.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418',
    'https://images.pexels.com/photos/6331230/pexels-photo-6331230.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=777&w=418',
    // Add more image URLs as needed
  ];

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      {images.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col items-center justify-center">
            <Image src={imageUrl} width={460} height={460} className='object-cover w-full h-screen' alt={`Image ${index + 1}`} />
            <h1 className='text-center text-white font-semibold absolute'>Compra aqui Amigo!</h1>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


export default ImageSwiper;



{/* <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}