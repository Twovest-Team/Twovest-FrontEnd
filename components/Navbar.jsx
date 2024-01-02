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
                <div className='mr-4'><MenuIcon/></div>
                <Link href={"/"} className="items-center flex">
                    <Image src={logo} width={105} height={24} alt="Logo Twovest" className="xs:hidden"></Image>
                    <Image src={logo} width={130} height={24} alt="Logo Twovest" className="hidden xs:block"></Image></Link>
            </div>
            <div className="flex">
                <div className="xs:mr-2 mr-1"><FavoriteBorderOutlinedIcon/></div>
                <div className="xs:mx-2 mx-1"><LocalMallOutlinedIcon/></div>
                <div className="xs:ml-2 ml-1"><AccountCircleOutlinedIcon/></div>
            </div>
        </nav>
    )

}