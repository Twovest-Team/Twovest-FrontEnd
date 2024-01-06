import { SocialMediaLogos_black } from "../SocialMediaLogos_black"
import { CategoriesList } from "./CategoriesList"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { general_categories } from "@/constants";

export const CategoriesMenu = ({idCategory, categoryOpen, toggleCategory, genderState, toggleMenu})=>{
    
    if(idCategory != ""){
        return(
                
            <div className={`${categoryOpen ? "translate-x-0" : "-translate-x-full"}
            bg-white z-50 overflow-scroll h-full w-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>
        
                <div className="flex  items-center border-b-grey border-b-2">
                    <div className="flex mx-4">
                        <div onClick={()=> toggleCategory(idCategory)}><ArrowBackIosIcon/></div>
                    </div>
                    <div className="flex my-5">
                        <h6 className="font-semibold">{general_categories.find(e=>e.id==idCategory).name}</h6>
                    </div> 
                </div>

            <CategoriesList idCategory={idCategory} genderState={genderState} toggleMenu={toggleMenu} toggleCategory={toggleCategory}/> 
                
                <SocialMediaLogos_black/>
        
            </div>
    )
    }
    
}