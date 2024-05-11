'use client'

import { Zoom } from "reactjs-image-zoom";
import getStorageImage from "@/utils/getStorageImage";

const ProductZoomImage = ({ image, discount }) => {
    return (
        <figure className="relative w-[580px] min-w-[580px] h-[560px] min-h-[560px]">
            <Zoom
                width={580}
                height={560}
                maxwidth={580}
                position='center'
                size={150}
                bgsize="contain"
                cursor="crosshair"
                borderpixel={0}
                className="rounded-[25px] p-2"
                imagesrc={getStorageImage(image.url)}
            />

            {discount > 0 && (
                <div className="absolute top-0 left-0 px-6 py-2.5 text-white flex justify-center items-center bg-primary_main rounded-full font-semibold">
                    {discount}% OFF
                </div>
            )}
        </figure>
    )
}

export default ProductZoomImage