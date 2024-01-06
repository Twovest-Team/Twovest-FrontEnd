"use client";

import logo from "../public/images/logo_twovest_black.svg";
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

//import componentes etc
import handleGender from "@/utils/handleGender";
import getLocalStorage from "@/utils/localStorage/getLocalStorage";
import { Cart } from "./navbar/Cart";
import { SideMenu } from "./navbar/SideMenu";

//import de icons materialUI
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


export const Navbar = () =>{

    const[menuOpen, setMenuOpen] = useState(false);
    const[categoryOpen, setCategoryMenu] = useState(false);
    const[idCategory, setIdCategory] = useState("");
    const[cestoOpen, setCesto] = useState(false);
    const[genderState, setGenderState] = useState("");

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const toggleCategory = (id) =>{
        setCategoryMenu(!categoryOpen);
        if(idCategory ==""){
            setIdCategory(id);
        }else{
            setIdCategory("");
        }
    }

    const toggleCesto = () =>{
        setCesto(!cestoOpen)   
    }


    useEffect(() =>{
        let activeGender = getLocalStorage("gender");
        setGenderState(activeGender);
        console.log(activeGender)
    }, [])


    const handleClickGender = (gender) => {
        handleGender(gender);
        setGenderState(gender);
    }
    

    const pathName = usePathname();


    if(pathName != "/landing"){

        return(

            /* ---------- Navbar ----------- */
            <nav className="flex justify-between z-50 max-w-[460px] w-full fixed top-0 px-4 py-5 bg-white border-b-grey border-b-2">
                <div className="flex">
                    <div className='mr-4' onClick={toggleMenu}><MenuIcon/></div>
                    <Link href={"/"} className="items-center flex">
                        <Image src={logo} width={105} height={24} alt="Logo Twovest" className="navbar_logo-xs"></Image>
                        <Image src={logo} width={130} height={24} alt="Logo Twovest" className="navbar_logo-sm"></Image></Link>
                </div>
                <div className="flex">
                    <div className="navbar_icons"><FavoriteBorderOutlinedIcon/></div>
                    <div className="navbar_icons" onClick={()=> toggleCesto()}><LocalMallOutlinedIcon/></div>
                    <div className="navbar_icons"><AccountCircleOutlinedIcon/></div>
                </div>
    

            {/* -------------- Menu lateral ----------------*/}
            <SideMenu menuOpen={menuOpen} handleClickGender={handleClickGender} genderState={genderState} toggleMenu={toggleMenu} toggleCategory={toggleCategory} categoryOpen={categoryOpen} idCategory={idCategory}/>
    

            {/*----------------- Cesto -----------------*/}
            <Cart cestoOpen={cestoOpen} toggleCesto={toggleCesto}/>
                    
    
    </nav>
        
    )
    }
    
}