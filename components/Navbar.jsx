"use client";

import logo from "../public/images/logo_twovest_black.svg";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";


//import de icons materialUI
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const Navbar = () =>{

    const[menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }


    return(
        <nav className="flex justify-between px-4 py-5 bg-white border-b-grey border-b-2">
            <div className="flex">
                <div className='mr-4' onClick={toggleMenu}><MenuIcon/></div>
                <Link href={"/"} className="items-center flex">
                    <Image src={logo} width={105} height={24} alt="Logo Twovest" className="logoNavbarXS"></Image>
                    <Image src={logo} width={130} height={24} alt="Logo Twovest" className="logoNavbarSM"></Image></Link>
            </div>
            <div className="flex">
                <div className="iconsNavbar"><FavoriteBorderOutlinedIcon/></div>
                <div className="iconsNavbar"><LocalMallOutlinedIcon/></div>
                <div className="iconsNavbar"><AccountCircleOutlinedIcon/></div>
            </div>



            <div
        className={`sidebar ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white z-50 overflow-scroll  h-full w-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out`}
      >
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

            <div className="bg-black text-white px-4 py-4 rounded">Fazer log in ou registo</div>

            <input type="text" placeholder="Pesquisa" className="mt-3 px-4 py-4 w-full rounded border border-grey"/>

            <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-grey_opacity_50 p-4 rounded">Vestuário</div>
                <div className="bg-grey_opacity_50 p-4 rounded">Calçado</div>
                <div className="bg-grey_opacity_50 p-4 rounded">Acessórios</div>
                <div className="bg-grey_opacity_50 p-4 rounded">Marcas</div>
                <div className="bg-primary_main text-white p-4 rounded">Sustentável</div>
                <div className="bg-grey_opacity_50 p-4 rounded">Promoções</div>
            </div>

        </ul>

        <div className="border border-b border-grey mx-4 my-6"></div>

        <ul className="mx-4">
            <div className="my-6 flex justify-between items-center">
                <div>
                    <div className="font-semibold">Galeria de Looks</div>
                    <div className="text-grey caption">🔥 Descobre novos looks e inspira-te!</div>
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>
                
            </div>
            <div className="my-6 font-semibold flex justify-between">
                <div>
                Pontos de entrega
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </div>
            <div className="my-6 font-semibold flex justify-between">
                <div>
                Fórum
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </div>
            <div className="my-6 font-semibold flex justify-between">
                <div className="text-primary_main">
                Pontos&Cupões
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </div>
            <div className="my-6 font-semibold flex justify-between">
                <div>
                Contactos
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </div>
            <div className="my-6 font-semibold flex justify-between">
                <div>
                Help Center
                </div>
                <div>
                    <ArrowForwardIosIcon className="text-[18px]"/>
                </div>  
            </div>
            
        </ul>

        <div className="border border-b border-grey mx-4 my-6"></div>

        <ul className="mx-4">
           <div className="my-6">Sobre nós</div>
           <div className="my-6">Proteção de dados</div> 
           <div className="my-6">Termos de serviço</div> 
           <div className="my-6">Aviso legal</div>  
        </ul>

        <div className="border border-b border-grey my-6"></div>

        <div className="flex justify-between items-center mb-6">

            <div className="flex mx-4">
                <div className="mx-2">O</div>
                <div className="mx-2">O</div>
                <div className="mx-2">O</div>
                <div className="mx-2">O</div>
                <div className="mx-2">O</div>
            </div>

            <div className="mx-4">
                <div className="caption">@ 2023 Twovest</div>
            </div>

          
        </div>

        </div>

    </nav>
    )

}