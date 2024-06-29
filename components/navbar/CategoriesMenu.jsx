import { CategoriesList } from "./CategoriesList"
import { KeyboardArrowLeft } from "@mui/icons-material";
import { general_categories } from "@/constants";
import FooterNavbar from "./FooterNavbar";
import { useEffect, useState } from "react";
import IconButton from "../buttons/icons/IconButton";

export const CategoriesMenu = ({ gender, idCategory, categoryOpen, handleClickCategory, handleClickMenu }) => {
    const [menuVisible, setMenuVisible] = useState(categoryOpen);

    useEffect(() => {
        if (categoryOpen) {
            setMenuVisible(true);
        } else {
            setTimeout(() => setMenuVisible(false), 200); // Match the delay of the transition
        }
    }, [categoryOpen]);

    if (!idCategory) return null;

    return (
        <div className={`${menuVisible ? 'visible' : 'invisible'} ${menuVisible ? 'translate-x-0' : '-translate-x-full'}
            bg-white z-[100] overflow-auto h-full min-w-[280px] max-w-[448px] scroll_bar-invisible w-screen fixed top-0 left-0 transition-all duration-500 delay-200 flex flex-col`}>
            <div className="flex items-center border-b-grey border-b min-h-[65px]">
                <div className="flex ml-4 mr-0.5">
                    <IconButton
                        onClick={() => handleClickCategory(idCategory)}
                        icon={<KeyboardArrowLeft sx={{ fontSize: 29 }} />}
                        className="-translate-x-1"
                        ariaLabel="Voltar Atrás"
                    />
                </div>
                <div className="flex">
                    <h1 className="font-semibold text-h6">{general_categories.find(e => e.id == idCategory).name}</h1>
                </div>
            </div>
            <CategoriesList
                gender={gender}
                idCategory={idCategory}
                handleClickMenu={handleClickMenu}
                handleClickCategory={handleClickCategory}
            />
            <div className="flex-grow flex items-end w-full">
                <FooterNavbar />
            </div>
        </div>
    );
};
