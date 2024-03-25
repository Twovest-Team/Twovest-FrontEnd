'use client'

import useGender from "@/hooks/client-hooks/useGender";
import ContentSlider from "./ContentSlider";
import useFetch from "@/hooks/client-hooks/useFetch";
import useScroll from "@/hooks/client-hooks/useScroll";
import getAllStyles from "@/utils/db/getAllStyles";
import Link from "next/link";
import Button from "../buttons/Button";

const FiltersGallery = ({ currentCategory }) => {

    const categories = useFetch(getAllStyles);
    const [gender] = useGender();
    const [scrollX, scrollY] = useScroll();
    const scrollCSS = scrollY && scrollY >= 75 ? 'shadow-md h-24' : 'h-16'


    return (
        <ContentSlider
            className={`sticky top-[75px] z-10 w-full transition-all duration-300 bg-white ${scrollCSS} flex items-center`}>

            {gender && categories &&
                <>

                    <Button
                        height='11'
                        href={`/gallery/${gender.string}`}
                        type={!currentCategory ? 'black' : 'grey'}
                        ariaLabel='Todos os looks'
                    >
                        Todos
                    </Button>


                    {categories.map(e => (
                        <Button
                            key={e.id}
                            height='11'
                            href={`/gallery/${gender.string}?style=${e.name}`}
                            type={currentCategory === e.name ? 'black' : 'grey'}
                            ariaLabel={`Estilo: ${e.name}`}
                        >
                            {e.name}
                        </Button>
                    ))}
                </>
            }


        </ContentSlider>
    )
}

export default FiltersGallery