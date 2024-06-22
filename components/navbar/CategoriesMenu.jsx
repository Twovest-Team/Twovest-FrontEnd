import { CategoriesList } from "./CategoriesList"
import { KeyboardArrowLeft } from "@mui/icons-material";
import { general_categories } from "@/constants";
import FooterNavbar from "./FooterNavbar";
import { useEffect, useState } from "react";
import IconButton from "../buttons/icons/IconButton";

export const CategoriesMenu = ({ idCategory, categoryOpen, handleClickCategory, handleClickMenu }) => {

    const [visibility, setVisibility] = useState(categoryOpen ? 'visible' : 'invisible');

    useEffect(() => {
        setVisibility(categoryOpen ? 'visible' : 'invisible');
        if (!categoryOpen) setTimeout(() => setVisibility('invisible'), 200);
    }, [categoryOpen]);

    if (!idCategory) return null

    return (

        <div className={`${visibility} ${categoryOpen ? 'translate-x-0' : '-translate-x-full'}
            bg-white z-[100] overflow-auto h-full min-w-[280px] max-w-[448px] scroll_bar-invisible w-screen fixed top-0 left-0 transition-all duration-500 delay-100 flex flex-col`}>

            <div className="flex items-center border-b-grey border-b min-h-[65px]">
                <div className="flex ml-4 mr-0.5">
                    <IconButton
                        onClick={() => handleClickCategory(idCategory)}
                        icon={<KeyboardArrowLeft sx={{ fontSize: 29 }} />}
                        className="-translate-x-1"
                        aria-label="Voltar Atrás"
                    />
                </div>
                <div className="flex">
                    <h1 className="font-semibold text_h6">{general_categories.find(e => e.id == idCategory).name}</h1>
                </div>
            </div>

            <CategoriesList
                idCategory={idCategory}
                handleClickMenu={handleClickMenu}
                handleClickCategory={handleClickCategory}
            />

            <div className="flex-grow flex items-end w-full">
            <FooterNavbar />

            </div>

        </div>
    )

}

