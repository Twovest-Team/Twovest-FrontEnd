"use client";

import logo from "../public/images/logo_twovest_black.svg";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";
import { Buttons } from "./Buttons";
import vestuario from "../public/images/categories/vestuario.png";
import calcado from "../public/images/categories/calcado.png";
import acessorios from "../public/images/categories/acessorios.png";
import sustentavel from "../public/images/icons/sustentavel.svg";
import PortugalFlag from "@/public/images/idiomas/portugal_idioma.svg";

//import componentes pags
import { VestuarioLista } from "./menuCategories/Vestuario";
import { CalcadoLista } from "./menuCategories/Calcado";
import { AcessoriosLista } from "./menuCategories/Acessorios";
import { SocialMediaLogos_black } from "./SocialMediaLogos_black";
import LanguageButton from "./LanguageButton";

//import de icons materialUI
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SellIcon from '@mui/icons-material/Sell';
import StarsIcon from '@mui/icons-material/Stars';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export const Navbar = () =>{

    const[menuOpen, setMenuOpen] = useState(false);
    const[categoryOpen, setCategoryMenu] = useState(false);
    const[nameCategory, setNameCategory] = useState("");

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const toggleCategory = (name) =>{
        setCategoryMenu(!categoryOpen);
        setNameCategory(name);
    }

    
    return(
        <nav className="flex justify-between px-4 py-5 bg-white border-b-grey border-b-2">
            <div className="flex">
                <div className='mr-4' onClick={toggleMenu}><MenuIcon/></div>
                <Link href={"/"} className="items-center flex">
                    <Image src={logo} width={105} height={24} alt="Logo Twovest" className="navbar_logo-xs"></Image>
                    <Image src={logo} width={130} height={24} alt="Logo Twovest" className="navbar_logo-sm"></Image></Link>
            </div>
            <div className="flex">
                <div className="navbar_icons"><FavoriteBorderOutlinedIcon/></div>
                <div className="navbar_icons"><LocalMallOutlinedIcon/></div>
                <div className="navbar_icons"><AccountCircleOutlinedIcon/></div>
            </div>



        <div className={`${menuOpen ? "translate-x-0" : "-translate-x-full"}
         bg-white z-50 overflow-scroll  h-full w-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>

        <div className="flex justify-between items-center border-b-grey border-b-2">

            <div className="flex my-5 mx-4">
                <p className="font-semibold mr-4">
                    Mulher
                </p>
                <p className="font-semibold mx-4 text-grey">
                    Homem
                </p>
            </div>
            <div className="flex mx-4">
                <div onClick={toggleMenu}><CloseOutlinedIcon/></div>
            </div>

          
        </div>

        <ul className="mx-4 my-4">

            <Buttons btnState="secondaryMain" text="Fazer log in ou registo" icon="navigateNext" btnSize="menuSize"/>

            <input type="text" placeholder="Pesquisa" className="mt-3 px-4 py-4 w-full rounded border border-grey"/>

            <div className="menu_categories mt-4">
                <div className="bg-grey_opacity_50 p-4 cursor-pointer rounded flex justify-between" onClick={() => toggleCategory("Vestuário")}><p>Vestuário</p><Image src={vestuario} width={25} height={25} alt="vestuário"/></div>
                <div className="bg-grey_opacity_50 p-4 cursor-pointer rounded flex justify-between" onClick={() => toggleCategory("Calçado")}><p>Calçado</p><Image src={calcado} width={27} height={25} alt="calçado"/></div>
                <div className="bg-grey_opacity_50 p-4 cursor-pointer rounded flex justify-between" onClick={() => toggleCategory("Acessórios")}><p>Acessórios</p><Image src={acessorios} width={32} height={20} alt="acessórios"/></div>
                <div className="bg-grey_opacity_50 p-4 cursor-pointer rounded flex justify-between"><p>Marcas</p><StarsIcon className="fill-black" alt="simbolo marcas"/></div>
                <div className="bg-primary_main text-white cursor-pointer items-center p-4 rounded flex justify-between"><p>Sustentável</p><Image src={sustentavel} width={25} height={25} alt="simbolo sustentavel"/></div>
                <div className="bg-grey_opacity_50 cursor-pointer p-4 rounded flex justify-between"><p>Promoções</p><SellIcon className="fill-primary_main" alt="simbolo Promoções"/></div>
            </div>

        </ul>

        <div className="border border-b border-grey mx-4 my-6"></div>

        <ul className="mx-4">
            <Link href={"/"} className="my-6 flex justify-between items-center">
                <div>
                    <div className="font-semibold">Galeria de Looks</div>
                    <div className="text-grey caption">🔥 Descobre novos looks e inspira-te!</div>
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>
                
            </Link>
            <Link href={"/"} className="my-6 font-semibold flex justify-between">
                <div>
                Pontos de entrega
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </Link>
            <Link href={"/"} className="my-6 font-semibold flex justify-between">
                <div>
                Fórum
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </Link>
            <Link href={"/"} className="my-6 font-semibold flex justify-between">
                <div className="text-primary_main">
                Pontos&Cupões
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </Link>
            <Link href={"/"} className="my-6 font-semibold flex justify-between">
                <div>
                Contactos
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </Link>
            <Link href={"/"} className="my-6 font-semibold flex justify-between">
                <div>
                Help Center
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </Link>
            
        </ul>

        <div className="border border-b border-grey mx-4 my-6"></div>

        <ul className="mx-4">
           <div className="my-6"><Link href={"/"}>Sobre nós</Link></div>
           <div className="my-6"><Link href={"/"}>Proteção de dados</Link></div> 
           <div className="my-6"><Link href={"/"}>Termos de serviço</Link></div> 
           <div className="my-6"><Link href={"/"}>Aviso legal</Link></div>  
        </ul>

        <button className="w-16 h-8 mx-4 px-3 py-2 rounded-[100px] border border-grey justify-start items-center gap-2 inline-flex">
        <div className="w-4 h-4 justify-center items-center flex">
        <Image src={PortugalFlag} alt="Bandeira de Portugal" width={16} height={16} />
        </div>
        <div className="text-black caption">PT</div>
        </button>
            
        
            <SocialMediaLogos_black/>

        </div>



{/*----------------- MENU CATEGORIAS -----------------*/}

    <div className={`${categoryOpen ? "translate-x-0" : "-translate-x-full"}
     bg-white z-50 overflow-scroll h-full w-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>

        <div className="flex  items-center border-b-grey border-b-2">
            <div className="flex mx-4">
                <div onClick={()=> toggleCategory(nameCategory)}><ArrowBackIosIcon/></div>
            </div>
            <div className="flex my-5">
                <h6 className="font-semibold">{nameCategory}</h6>
            </div> 
        </div>


        {nameCategory == "Vestuário" && (
            <VestuarioLista/>
        )}
        
        
        {nameCategory == "Calçado" && (
            <CalcadoLista/>
        )}

                
        {nameCategory == "Acessórios" && (
            <AcessoriosLista/>
        )}
        
        <SocialMediaLogos_black/>
        

    </div>

    </nav>
    )

}