'use client'
import getStorageImage from "@/utils/getStorageImage"
import Image from "next/image"

const ProductSlider = ({ images }) => {

 
    return (
        <>
            <figure className="flex-grow scroll_bar-invisible">

                {images.map((image, index) => (
                    <div key={index} className="relative w-full h-full">
                        <Image
                            src={getStorageImage(image.url)}
                            className="object-contain pointer-events-none"
                            fill={true}
                            alt={image.alt} />

                    </div>
                ))}

            </figure>


            <article className="absolute top-6 right-6 flex flex-col gap-4">

                {images.length > 1 && images.map((image, index) => (
                    <div key={index}
                        className={`w-1.5 transition-all duration-300 rounded-full ${index === 0 ?
                            ' bg-dark h-8' :
                            ' bg-grey h-1.5'
                            }`}>
                    </div>
                ))}

            </article>
        </>
    )
}

export default ProductSlider