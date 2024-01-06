import { PrimaryMenuPagesList } from "./PrimaryMenuPages"
import { SecondaryMenuPagesList } from "./SecondaryMenuPages"
import { SocialMediaLogos_black } from "../SocialMediaLogos_black"
import { Buttons } from "../Buttons"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SellIcon from '@mui/icons-material/Sell';
import StarsIcon from '@mui/icons-material/Stars';
import { categories, general_categories } from "@/constants";
import sustentavel from "/public/images/icons/sustentavel.svg";
import LanguageButton from "../LanguageButton";
import Image from "next/image";
import { CategoriesMenu } from "./CategoriesMenu";
import { SustainableIcon } from "../icons/SustainableIcon";


export const SideMenu = ({menuOpen, handleClickGender, genderState, toggleMenu, toggleCategory, categoryOpen, idCategory}) => {
    return(
        <>
        {/* ---- Menu categorias ---- */}
        <CategoriesMenu idCategory={idCategory} categoryOpen={categoryOpen} toggleCategory={toggleCategory} genderState={genderState} toggleMenu={toggleMenu}/>
        
        <div className={`${menuOpen ? "translate-x-0" : "-translate-x-full"}
             bg-white z-50 overflow-scroll h-full w-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>
    
            <div className="flex justify-between items-center border-b-grey border-b-2">
    
                <div className="flex my-5 mx-4">
                    
                    <button onClick={() => handleClickGender("mulher")} className={`${genderState != "mulher" ? "text-secondary font-semibold mr-2" : "text-black font-semibold mr-2" } `}>
                        Mulher
                    </button>
                    <button onClick={() => handleClickGender("homem")} className={`${genderState != "homem" ? "text-secondary" : "text-black" } font-semibold mx-2`}>
                        Homem
                    </button>
    
                </div>
                <div className="flex mx-4">
                    <div onClick={toggleMenu}><CloseOutlinedIcon/></div>
                </div>
    
            </div>
    
            <ul className="mx-4 my-4">
    
                <Buttons btnState="secondaryMain" text="Fazer log in ou registo" icon="navigateNext" btnSize="menuSize"/>
    
                <input type="text" placeholder="Pesquisa" className="mt-3 px-4 py-4 w-full rounded border border-grey"/>
                
                <div className="menu_categories mt-4">
                
                {general_categories.map((e) => (

                    
                    <div key={e.id} className="bg-grey_opacity_50 p-4 cursor-pointer items-center rounded flex justify-between" onClick={() => toggleCategory(e.id)}><p>{e.name}</p><Image src={e.img} width={25} height={25} alt={e.name}/></div>
                    

                ))}
                    <div className="bg-grey_opacity_50 p-4 cursor-pointer rounded flex justify-between"><p>Marcas</p><StarsIcon className="fill-black" alt="simbolo marcas"/></div>
                    <div className="bg-primary_main text-white cursor-pointer items-center p-4 rounded flex justify-between"><p>Sustentável</p><SustainableIcon className="w-[25px]" color="white"/></div>
                    <div className="bg-grey_opacity_50 cursor-pointer p-4 rounded flex justify-between"><p>Promoções</p><SellIcon className="fill-primary_main" alt="simbolo Promoções"/></div>
                 </div>
                
    
            </ul>
    
            <PrimaryMenuPagesList/>
    
            <SecondaryMenuPagesList/>
            
            <div className="mx-4"><LanguageButton textColor="black"/></div>
            
            <SocialMediaLogos_black/>
    
            </div>
        
        </>
    )
}