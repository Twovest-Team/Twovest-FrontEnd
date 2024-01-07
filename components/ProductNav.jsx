import { useEffect, useRef, useState } from "react"
import NavigationTitle from "./NavigationTitle"
import { SustainableIcon } from "@/components/icons/SustainableIcon"
import Image from "next/image"
import Link from "next/link"

const ProductNav = ({ is_sustainable, discount, brand }) => {

    const divRef = useRef();
    const brandImage = useRef();
    const [scrollY, setScrollY] = useState(0);

    function handleScrollChange() {
        setScrollY(window.scrollY);
    }

    function changeProductNavProperties() {
        if (scrollY > 0) {
            divRef.current.classList.add('bg-white');
            divRef.current.classList.remove('bg-none');
            divRef.current.classList.add('shadow-lg');
            brandImage.current.classList.remove('hidden');
        } else {
            divRef.current.classList.remove('bg-white');
            divRef.current.classList.add('bg-none');
            divRef.current.classList.remove('shadow-lg');
            brandImage.current.classList.add('hidden');
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrollChange);

        return () => {
            window.removeEventListener('scroll', handleScrollChange);
        };
    }, [])

    useEffect(() => {
        changeProductNavProperties();
    }, [scrollY]);


    return (
        <div ref={divRef} className="top-[68px] w-full max-w-[460px] z-20 fixed transition-all duration-300">
            <NavigationTitle>
                <div className="mr-auto flex flex-row gap-3 items-center">
                    {is_sustainable && <SustainableIcon color='#05CE86' width={32} />}

                    {discount > 0 &&
                        <div className="px-6 py-2.5 text-white flex justify-center items-center bg-primary_main rounded-full font-semibold caption">
                            {discount}% OFF
                        </div>
                    }
                </div>

                <Link href={'/'}>
                    <Image
                        src={brand.logo_url}
                        width={35}
                        height={35}
                        alt={brand.name}
                        ref={brandImage}
                        className="rounded-full shadow-md transition-all duration-300 hidden"
                    />
                </Link>

            </NavigationTitle>
        </div>
    )
}

export default ProductNav