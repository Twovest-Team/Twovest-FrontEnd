"use client";

import logo from "../public/images/logo_twovest_black.svg";
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Buttons } from "./Buttons";
import sustentavel from "../public/images/icons/sustentavel.svg";
import PortugalFlag from "@/public/images/idiomas/portugal_idioma.svg";

//import componentes pags
import { SocialMediaLogos_black } from "./SocialMediaLogos_black";
import { CardCart } from "./CardCart";
import handleGender from "@/utils/handleGender";
import getLocalStorage from "@/utils/localStorage/getLocalStorage";

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


import { general_categories } from "@/constants";
import { CategoriesList } from "./menuCategories/CategoriesList";


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


            <nav className="flex justify-between z-10 max-w-[460px] w-full fixed top-0 px-4 py-5 bg-white border-b-grey border-b-2">
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
    
            
    
    
            {/*------------ MENU LATERAL ---------------*/}
    
            <div className={`${menuOpen ? "translate-x-0" : "-translate-x-full"}
             bg-white z-10 overflow-scroll h-full w-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>
    
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

    {idCategory != "" && (
        
        <div className={`${categoryOpen ? "translate-x-0" : "-translate-x-full"}
         bg-white z-20 overflow-scroll h-full w-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out`}>
    
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
    
    )}

    
    
    {/*-------------- CESTO -----------------*/}
    
    <div className={`${cestoOpen ? "translate-x-0" : "translate-x-full"}
         bg-white z-50 overflow-scroll w-screen h-screen fixed top-0 right-0 transition-transform duration-300 ease-in-out`}>
    
                <div className="flex justify-between items-center border-grey border">
    
                    <div className="flex my-5 mx-4">
                        <LocalMallOutlinedIcon className="mr-2"/>
                        <p className="font-semibold">Cesto de compras</p>   
                    </div>
                    <div className="flex mx-4">
                        <div onClick={toggleCesto}><CloseOutlinedIcon/></div>
                    </div>
    
                </div>
    
                <div className="border-b border-grey"></div>
    
    
                <div className="mx-4 h-3/4  overflow-scroll my-1">
                    
                   
                <CardCart/>
              
                   
                </div>
    
                <div className="w-screen fixed bottom-0 bg-white">
                    <div className="border border-grey"></div>
    
                    <div className="flex mx-4 my-6 justify-between">   
                        <div>
                            <div className="font-semibold">Total</div>
                                <div className="text-grey">IVA Incluído</div>
                            </div>
                        <div>
                            <div className="font-semibold">96.00€</div>    
                        </div>  
                    </div>
                    <div className="mx-4 my-6 ">
                        <Buttons btnState="defaultMain" text="Proceder com a compra" icon="navigateNext" btnSize="menuSize"/>
                    </div>
                </div>
    
    
            </div>
            
    
        </nav>
        
        )
    }
    
    
}