import logo from "../public/images/logo_twovest_black.svg";
import Image from 'next/image';
import Link from "next/link";

//import de icons materialUI
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export const Navbar = () =>{

    return(
        <nav className="flex justify-between px-4 py-5 bg-white border-b-grey border-b-2">
            <div className="flex">
                <div className='mr-4 '><MenuIcon/></div>
                <Link href={"/"}><Image src={logo} width={130} height={100} alt="Logo Twovest"></Image></Link>
            </div>
            <div className="flex">
                <div className="mr-2"><FavoriteBorderOutlinedIcon/></div>
                <div className="mx-2"><LocalMallOutlinedIcon/></div>
                <div className="ml-2"><AccountCircleOutlinedIcon/></div>
            </div>
        </nav>
    )

}