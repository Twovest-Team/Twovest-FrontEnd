'use client'

import useScroll from "@/hooks/client-hooks/useScroll";
import ContentSlider from "../sliders/ContentSlider";
import Button from "../buttons/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TopbarFilters = ({ elements }) => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [scrollX, scrollY] = useScroll();
    const scrollCSS = scrollY && scrollY >= 75 ? "shadow-md h-[4.5rem] z-40" : "h-[4.5rem] z-10";
    const params = searchParams.get('filter')
    const paramsArray = params ? params.split(',') : null


    function getQueryString(element, index) {
        if (index === 0) return '';
        if (isFilterSelected(element)) return removeFilterFromQuery(element);
        const newParams = params ? params + ',' + element : element;
        return '?filter=' + newParams;
    }
    
    function removeFilterFromQuery(element) {
        const newParamsArray = paramsArray.filter(param => param !== element);
        return newParamsArray.length ? '?filter=' + newParamsArray.join(',') : '';
    }
    
    function isFilterSelected(element){
        if(!params) return false
        const paramsArray = params.split(',');
        return paramsArray.includes(element)
    }
    

    return (
        <ContentSlider className={`sticky top-[75px] w-full transition-all duration-300 bg-white ${scrollCSS} flex items-center`}>
            {elements && elements.map((element, index) => (
                <li key={index}>
                    <Button
                        scroll={false}
                        height='44px'
                        ariaLabel={`Aplicar filtro: ${element}`}
                        href={pathname + getQueryString(element, index)}
                        type={isFilterSelected(element) || !params && index === 0 ? "black" : "grey"}
                    >
                        {element}
                    </Button>
                </li>
            ))}
        </ContentSlider>
    )
}

export default TopbarFilters