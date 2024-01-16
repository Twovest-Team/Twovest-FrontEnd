import { SocialMediaLogos_black } from "../logos/SocialMediaLogos_black"
import { CategoriesList } from "./CategoriesList"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { general_categories } from "@/constants";

export const CategoriesMenu = ({ idCategory, categoryOpen, handleClickCategory, genderState, handleClickMenu }) => {


    if (idCategory != "") {
        return (

            <div className={`${categoryOpen ? "translate-x-0" : "-translate-x-full"}
            bg-white z-50 overflow-scroll h-full min-w-[280px] max-w-[460px] w-screen fixed top-0 left-0 transition-transform duration-400 ease-in-out`}>

                <div className="flex  items-center border-b-grey border-b-2  h-[66px]">
                    <div className="flex ml-4 mr-2">
                        <div onClick={() => handleClickCategory(idCategory)}><ArrowBackIosIcon className="text-[18px] cursor-pointer" /></div>
                    </div>
                    <div className="flex">
                        <h6 className="font-semibold">{general_categories.find(e => e.id == idCategory).name}</h6>
                    </div>
                </div>

                <CategoriesList
                    idCategory={idCategory}
                    genderState={genderState}
                    handleClickMenu={handleClickMenu}
                    handleClickCategory={handleClickCategory}
                />

                <SocialMediaLogos_black />

            </div>
        )
    }

}