'use client';

import getStorageImage from "@/utils/getStorageImage";
import { Transition } from '@headlessui/react';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import IconButton from "../buttons/icons/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

const ProductZoomModal = ({ defaultImageId, images }) => {
    const imgRef = useRef(null);

    const defaultImage = images.find(image => image.id == defaultImageId);

    const [zoomed, setZoomed] = useState(false);
    const [show, setShow] = useState(true);
    const [selectedImage, setSelectedImage] = useState(defaultImage);

    useEffect(() => {
        const currentImg = imgRef.current;

        if (currentImg) currentImg.addEventListener("mousemove", handleMouseMove);

        return () => {
            if (currentImg) currentImg.removeEventListener("mousemove", handleMouseMove);
        };
    }, [imgRef.current]);

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    })

    const styles = () => {
        return zoomed ? 'w-full cursor-zoom-out [&>figure]:scale-150' : 'w-[750px] cursor-zoom-in';
    };

    const handleZoom = () => {
        setZoomed(!zoomed);
    };

    const handleMouseMove = (e) => {
        let yPercent = parseInt(e.pageY / window.innerHeight * 100);
        if (imgRef.current) {
            imgRef.current.style.transformOrigin = '50% ' + yPercent + '%';
        }
    };

    const handleClick = (image) => {
        setShow(false);
        setTimeout(() => {
            setZoomed(false);
            setSelectedImage(image);
            setShow(true);
        }, 200);
    };


    return (
        <div className="hidden lg:flex fixed z-50 top-0 left-0 right-0 bottom-0 w-screen h-full bg-white px-5">
            <div className="pt-5 pr-5 z-10 flex flex-col gap-4">
                {images && images.map(image => (
                    <button
                        onClick={() => handleClick(image)}
                        key={image.id}
                        className={`relative w-[70px] h-[70px] rounded border ${selectedImage.id === image.id ? 'border-dark' : 'border-grey'}`}>
                        <Image className="p-1 object-cover" fill={true} alt={image.alt} src={getStorageImage(image.url)} />
                    </button>
                ))}
            </div>

            <Transition
                className='w-full'
                show={show}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div onClick={handleZoom} className={`relative h-full m-auto flex justify-center items-center ${styles()}`}>
                    <figure
                        ref={imgRef}
                        style={{ backgroundImage: `url(${getStorageImage(selectedImage.url)})` }}
                        className="absolute bg-no-repeat bg-center h-full w-full left-0 right-0 top-0 bottom-0 bg-contain transition duration-150"
                    />
                </div>
            </Transition>

            <Link href={'?zoom=false'} className='absolute top-5 right-10'>
                <IconButton
                    icon={<CloseIcon />}
                />
            </Link>

        </div>
    );
};

export default ProductZoomModal;
