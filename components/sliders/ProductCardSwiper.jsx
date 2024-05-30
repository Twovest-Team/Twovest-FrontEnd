'use client'

import React, { useEffect, useRef } from 'react'
import Link from "next/link";
import Image from "next/image";
import getStorageImage from "@/utils/getStorageImage";

import { register } from 'swiper/element/bundle';
register();


const ProductCardSwiper = ({ genderObj, id, productImages }) => {

    const swiperRef = useRef()

    const renderSlides = () => {
        return productImages.map((image, index) => (
            <swiper-slide key={index}>
                <Link className='w-full h-full' href={`/product/${genderObj.string}/${id}`}>
                    <Image
                        src={getStorageImage(image.url)}
                        alt={image.alt}
                        className="object-cover scale-90"
                        fill={true}
                    />
                </Link>
            </swiper-slide>
        ))
    }


    return (
        <div className='w-full  h-full productCardSwiper'>
            <swiper-container navigation={true} ref={swiperRef}>
                {renderSlides()}
            </swiper-container>
        </div>

    )
}

export default ProductCardSwiper