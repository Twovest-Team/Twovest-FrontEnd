"use client";

import logo from "../../public/images/logo_twovest_black.svg";
import Image from 'next/image';
import Link from "next/link";
import { useEffect } from "react";
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

export const Navbar = ({children}) => {

    const dispatch = useAppDispatch()
    const pathName = usePathname();
    const currentUser = useAppSelector(state => state.user.data)

    const handleClickMenu = () => {
        dispatch(toggleMenu());
    }

    const handleClickCart = () => {
        dispatch(toggleCart())
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

            <nav className="flex justify-between z-50 max-w-[460px] w-full fixed top-0 px-4 py-5 bg-white border-b-grey border-b-2">
                
                <div className="flex">
                    <button className='mr-4' onClick={handleClickMenu}><MenuIcon /></button>
                    <Link href={"/"} className="items-center flex">
                        <Image src={logo} width={105} height={24} alt="Logo Twovest" className="navbar_logo-xs"></Image>
                        <Image src={logo} width={130} height={24} alt="Logo Twovest" className="navbar_logo-sm"></Image></Link>
                </div>
                <div className="flex">
                    <button className="navbar_icons"><FavoriteBorderOutlinedIcon /></button>
                    <button className="navbar_icons" onClick={handleClickCart}><LocalMallOutlinedIcon /></button>
                    <button className="navbar_icons"><AccountCircleOutlinedIcon /></button>
                </div>


                {children}

            </nav>

        )
    }

}