'use client'

import React, { useEffect, useRef } from 'react'
import Link from "next/link";
import Image from "next/image";
import getStorageImage from "@/utils/getStorageImage";

import { register } from 'swiper/element/bundle';
register();


const ProductCardSwiper = ({ genderObj, id, productImages }) => {

    const swiperRef = useRef()

    useEffect(() => {
        const swiperEl = swiperRef.current;

        const params = {
            navigation: true,
            injectStyles: [
                `
                    .swiper:hover .swiper-button-prev, .swiper:hover .swiper-button-next  {
                        opacity: 1;
                    }

                    .swiper:hover .swiper-button-prev {
                        left: 0;
                    }

                    .swiper:hover .swiper-button-next {
                        right: 0
                    }

                    .swiper-button-disabled{
                        opacity: 0.5 !important;
                        pointer-events: auto !important;
                    }

                    .swiper-button-lock{
                        opacity: 0 !important;
                    }

                    .swiper-button-prev,
                    .swiper-button-next{
                        transition: all 350ms ease;
                        opacity: 0;
                        width: 24px;
                        height: 20px;
                        color: black;
                        background-color: #f0f0f0;
                        background-repeat: no-repeat;
                        background-size: 10px;
                    }

                    .swiper-button-next svg,
                    .swiper-button-prev svg {
                      display: none;
                    }

                    .swiper-button-prev{
                        padding: 10px 13px 10px 6px;
                        left: -43px;
                        border-radius: 0 100px 100px 0;
                        background-image: url("/static/images/icons/arrowLeft.svg");
                        background-position: 15px;
                    }

                    .swiper-button-next{
                        padding: 10px 6px 10px 13px;
                        right: -43px;
                        border-radius: 100px 0 0 100px;
                        background-image: url("/static/images/icons/arrowRight.svg");
                        background-position: 20px;
                    }
                `
            ]
        }

        Object.assign(swiperEl, params)

        swiperEl.initialize()
    }, [])

    const renderContainer = () => {
        return (
            <swiper-container ref={swiperRef} init='false'>
                {renderSlides()}
            </swiper-container>
        )
    }

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
        <div className='w-full h-full productCardSwiper'>
            {renderContainer()}
        </div>
    )
}

export default ProductCardSwiper