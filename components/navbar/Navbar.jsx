import Link from "next/link";
import Image from "next/image";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import UserItem from "./UserItem";
import GeneralItems from "./GeneralItems";
import MenuItem from "./MenuItem";

export const revalidate = 0

const Navbar = async ({ children }) => {

    const user = await useAuthServer();

    const renderLogo = () => (
        <Link href={"/"} className="items-center flex gap-3 relative">

            <Image
                src={"/static/images/logo_twovest_black_simple.svg"}
                width={18}
                height={18}
                alt="Logo Twovest"
                className="[@media(min-width:455px)]:hidden"
            />

            <Image
                src={"/static/images/logo_twovest_black.svg"}
                width={130}
                height={24}
                alt="Logo Twovest"
                className="hidden [@media(min-width:455px)]:inline"
            />

            <p className=" text-white mt-0.5 opacity-100 bg-black px-2 py-1 text-[9px] font-semibold rounded">BETA</p>
        </Link>
    )

    const renderLeft = () => (
        <div className="flex gap-4 -translate-x-3">
            <MenuItem />
            {renderLogo()}
        </div>
    )

    const renderRight = () => (
        <div className="flex justify-between items-center">
            <GeneralItems user={user} />
            <UserItem user={user} />
        </div>
    )

    return (
        <nav className="w-full fixed top-0 h-[75px] bg-white z-50 border-b border-gray-200">
            <div className="container h-full flex justify-between items-center">
                {renderLeft()}
                {renderRight()}
                {children}
            </div>
        </nav>
    )
}

export default Navbar