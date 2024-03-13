'use client'

import { PrimaryMenuPagesList } from "./PrimaryMenuPages"
import { SecondaryMenuPagesList } from "./SecondaryMenuPages"
import { SocialMediaLogos_black } from "../logos/SocialMediaLogos_black"
import { Buttons } from "../buttons/Buttons"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SellIcon from '@mui/icons-material/Sell';
import StarsIcon from '@mui/icons-material/Stars';
import { categories, general_categories } from "@/constants";
import LanguageButton from "../buttons/LanguageButton";
import Image from "next/image";
import { CategoriesMenu } from "./CategoriesMenu";
import { SustainableIcon } from "../buttons/icons/SustainableIcon";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"
import getLocalStorage from "@/utils/localStorage/getLocalStorage"
import { toggleMenu } from "@/redux/slices/menuToggle"
import handleGender from "@/utils/handleGender"
import SearchIcon from '@mui/icons-material/Search';

export const SideMenu = () => {

    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => state.user.data)
    const isMenuOpen = useAppSelector(state => state.menuToggle.isOpen)
    const [genderState, setGenderState] = useState("");
    const pathName = usePathname();
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [idCategory, setIdCategory] = useState("");

    const handleClickCategory = (id) => {
        setCategoryOpen(!categoryOpen);
        if (idCategory == "") {
            setIdCategory(id);
        } else {
            setIdCategory("");
        }
    }


    const handleClickMenu = () => {
        dispatch(toggleMenu());
    }

    useEffect(() => {
        let activeGender = getLocalStorage("gender");
        if (activeGender != genderState) {
            setGenderState(activeGender);
        }

    }, [pathName, genderState])

    const handleClickGender = (gender) => {
        handleGender(gender);
        setGenderState(gender);
    }

    return (
        <>

            {/* ---- Menu categorias ---- */}
            <CategoriesMenu
                idCategory={idCategory}
                categoryOpen={categoryOpen}
                handleClickCategory={handleClickCategory}
                genderState={genderState}
                handleClickMenu={handleClickMenu}
            />


            {/* ------ Menu lateral -------*/}
            <div className={`${isMenuOpen ? "translate-x-0 hidden" : "-translate-x-full block"}
             bg-white z-30 h-full w-screen min-w-[280px] max-w-[460px] fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>

                <div className="flex justify-between items-center border-b-grey border-b-2">

                    <div className="flex my-5 mx-4">

                        <button onClick={() => handleClickGender("mulher")} className={`${genderState != "mulher" ? "text-secondary font-semibold mr-2" : "text-black font-semibold mr-2"} `}>
                            Mulher
                        </button>
                        <button onClick={() => handleClickGender("homem")} className={`${genderState != "homem" ? "text-secondary" : "text-black"} font-semibold mx-2`}>
                            Homem
                        </button>

                    </div>
                    <div className="flex mx-4">
                        <div onClick={handleClickMenu} className="cursor-pointer"><CloseOutlinedIcon/></div>
                    </div>

                </div>

                <ul className="mx-4 my-4">


                    {currentUser == null && (
                        <Link href={"/login"} onClick={handleClickMenu}><Buttons btnState="secondaryMain" text="Fazer log in ou registo" icon="navigateNext" btnSize="menuSize" /></Link>
                    )}


                    <div className="mt-3 relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Pesquisa"
                        className="pl-14 pr-20 py-4 w-full rounded border border-grey focus:outline-none focus:border-black"
                    />
                    </div>    
                    {/* <input type="text" placeholder="Pesquisa" className="mt-3 px-4 py-4 w-full rounded border border-grey" /> */}

                    <div className="menu_categories mt-4">

                        {general_categories.map((e) => (


                            <div key={e.id} className="bg-grey_opacity_50 p-4 cursor-pointer items-center rounded flex justify-between" onClick={() => handleClickCategory(e.id)}><p>{e.name}</p><Image src={e.img} width={25} height={25} alt={e.name} /></div>


                        ))}
                        <Link onClick={handleClickMenu} href={"/brands"} className="bg-grey_opacity_50 p-4 cursor-pointer rounded flex justify-between"><div>Marcas</div><StarsIcon className="fill-black" alt="simbolo marcas" /></Link>
                        <div className="bg-primary_main text-white cursor-pointer items-center p-4 rounded flex justify-between"><Link href={"/"}>Sustentável</Link><SustainableIcon width={25} color="white" /></div>
                        <div className="bg-grey_opacity_50 cursor-pointer p-4 rounded flex justify-between"><Link href={"/"}>Promoções</Link><SellIcon className="fill-primary_main" alt="simbolo Promoções" /></div>
                    </div>


                </ul>

                <PrimaryMenuPagesList genderState={genderState} toggleMenu={handleClickMenu} />

                <SecondaryMenuPagesList toggleMenu={handleClickMenu} />

                <div className="mx-4"><LanguageButton textColor="black" /></div>

                <SocialMediaLogos_black />

            </div>

        </>
    )
}