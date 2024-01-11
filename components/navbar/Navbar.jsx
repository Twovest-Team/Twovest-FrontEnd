"use client";

import logo from "../../public/images/logo_twovest_black.svg";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

//import de icons materialUI
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartToggle";
import getUserData from "@/utils/db/getUserByEmail";
import { changeUserData } from "@/redux/slices/userSlice";
import { toggleMenu } from "@/redux/slices/menuToggle";
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/db/supabase";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import AutoModeIcon from '@mui/icons-material/AutoMode';


export const Navbar = ({children}) => {

    const dispatch = useAppDispatch()
    const router = useRouter();
    const pathName = usePathname();
    const currentUser = useAppSelector(state => state.user.data)
    const [user, setUser] = useState(null);

    const handleClickMenu = () => {
        dispatch(toggleMenu());
    }

    const handleClickCart = () => {
        dispatch(toggleCart())
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null)
        dispatch(changeUserData(null))
    }

    useEffect(() => {

        async function fetchUserData(){
            if (!currentUser) {
                let userData = await getUserData()
                dispatch(changeUserData(userData))
            }
        }

        fetchUserData()

    }, [currentUser])


    if (pathName != "/landing") {

        return (

            <nav className="flex justify-between z-50 max-w-[460px] min-w-[280px] w-full fixed top-0 px-4 py-5 bg-white border-b-grey border-b-2">
                
                <div className="flex">
                    <button className='mr-4' onClick={handleClickMenu}><MenuIcon /></button>
                    <Link href={"/"} className="items-center flex">
                        <Image src={logo} width={105} height={24} alt="Logo Twovest" className="navbar_logo-xs"></Image>
                        <Image src={logo} width={130} height={24} alt="Logo Twovest" className="navbar_logo-sm"></Image></Link>
                </div>
                <div className="flex">
                    <button className="navbar_icons"><FavoriteBorderOutlinedIcon /></button>
                    <button className="navbar_icons" onClick={handleClickCart}><LocalMallOutlinedIcon /></button>
                    
                    <Menu>
                        <Menu.Button><div className="navbar_icons"><AccountCircleOutlinedIcon /></div></Menu.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"> 
                                <Menu.Items className={"absolute flex-wrap bg-white mt-[66px] px-6 py-4 w-[220px] right-1 shadow rounded"}>

                        {currentUser ?
                        
                           <>
                                <Menu.Item className="mb-2 w-full">
                                {({ active }) => (
                                    
                                    <div className={`${active && 'bg-grey_opacity_50'} font-semibold`}>
                                    <div><div><Link href={"/profile"} className="truncate">Margarida Ferreira</Link></div></div>
                                    <div className="bg-primary_main px-1 py-2 w-full h-[32px] caption text-center mt-2 text-white rounded">ID: 941729</div>
                                    </div>
                                    
                                    
                                )}
                                </Menu.Item>

                                <div className="border-b border-grey my-4"></div>

                                <Menu.Item>
                                {({ active }) => (
                                    <div className={"w-full start-0"}>
                                    <Link href={"/profile"}
                                    className={`${active && 'bg-grey_opacity_50'}`}>
                                    <div className="mb-3 caption text-start">Perfil</div>
                                    </Link>
                                    </div>
                                )}
                                </Menu.Item>
                                <Menu.Item >
                                {({ active }) => (
                                    <div>
                                    <Link href={"/"}
                                    className={`${active && 'bg-grey_opacity_50'}`}>
                                    <div className="caption items-center flex"><AutoModeIcon className=" h-5 w-5 mr-1.5"/><div>Pontos&Cupões</div></div>
                                    </Link>
                                    </div>
                                )}
                                </Menu.Item>

                                <div className="border-b border-grey my-4"></div>

                                <Menu.Item >
                                {({ active }) => (
                                    <div>
                                    <Link href={"/"}
                                    className={`${active && 'bg-grey_opacity_50'}`}>
                                    <div className="mb-3 caption items-center flex"><ArrowCircleUpIcon className="h-5 w-5 mr-1.5"/><div>Submeter novo look</div></div>
                                    </Link>
                                    </div>
                                )}
                                </Menu.Item>
                                
                                <Menu.Item >
                                {({ active }) => (
                                    <div>
                                    <Link href={"/profile"}
                                    className={`${active && 'bg-grey_opacity_50'}`}>
                                    <div className="mb-3 caption">Gerir meus looks</div>
                                    </Link>
                                    </div>
                                )}
                                </Menu.Item>
                                <Menu.Item >
                                {({ active }) => (
                                    <div>
                                    <Link href={"/profile"}
                                    className={`${active && 'bg-grey_opacity_50'}`}>
                                    <div className="caption">Ver coleções de looks</div>
                                    </Link>
                                    </div>
                                )}
                                </Menu.Item>

                                <div className="border-b border-grey my-4"></div>

                                <Menu.Item >
                                {({ active }) => (
                                    <div>
                                    <Link href={"/profile"}
                                    className={`${active && 'bg-grey_opacity_50'}`}>
                                    <div className="mb-3 caption">Histórico de compras</div>
                                    </Link>
                                    </div>
                                )}
                                </Menu.Item>

                                <Menu.Item >
                                {({ active }) => (
                                    <div>
                                    <Link href={"/profile"}
                                    className={`${active && 'bg-grey_opacity_50'}`}>
                                    <div className="mb-3 caption">Definições de conta</div>
                                    </Link>
                                    </div>
                                )}
                                </Menu.Item>

                                <Menu.Item >
                                {({ active }) => (
                                    <div className={"w-full text-start"}>
                                        <div
                                        className={`${active && 'bg-grey_opacity_50'} text-error_main  caption`} onClick={handleLogout}>
                                        Sair -&gt;
                                        </div>
                                    </div>
                                )}
                                </Menu.Item>
                            </>
                            
                            :

                                <Menu.Item >
                                {({ active }) => (
                                    <div className="px-2 py-4">
                                    <div className="mb-3 font-semibold">Inicie sessão para poder aceder às definições de conta</div>
                                    <Link href={"/login"}
                                    className={`${active && 'bg-grey_opacity_50'} cursor-pointer`}><div className="bg-primary_main p-2 text-white caption font-semibold w-full rounded">Iniciar sessão</div>
                                    </Link>
                                    </div>
                                )}
                                </Menu.Item>
                        }
                        </Menu.Items>
                        </Transition>
                    </Menu>
                </div>


                {children}

            </nav>

        )
    }

}