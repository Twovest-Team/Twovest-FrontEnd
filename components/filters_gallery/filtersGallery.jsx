'use client'

import useGender from "@/hooks/client-hooks/useGender";
import ContentSlider from "../sliders/ContentSlider";
import useFetch from "@/hooks/client-hooks/useFetch";
import useScroll from "@/hooks/client-hooks/useScroll";
import getAllStyles from "@/utils/db/getAllStyles";
import Link from "next/link";

const FiltersGallery = () => {

    const categories = useFetch(getAllStyles);
    const [gender] = useGender();
    const [scrollX, scrollY] = useScroll();

    const scrollCSS = scrollY && scrollY >= 75 ? 'shadow-md h-24' : 'h-16'

    return (
        <ContentSlider
            className={`sticky top-[75px] z-10 w-full transition-all duration-300 bg-white ${scrollCSS} flex items-center`}>

            {gender && categories &&
                <>
                    <Link className="border-2 border-black px-8 py-2 rounded font-semibold" href={`/gallery/${gender.string}`}>
                        Todos
                    </Link>

                    {categories.map(e => (
                        <Link className="border-2 border-black px-8 py-2 rounded font-semibold" key={e.id} href={`/gallery/${gender.string}?style=${e.name}`}>
                            {e.name}
                        </Link>
                    ))}
                </>
            }


        </ContentSlider>
    )
}

export default FiltersGallery