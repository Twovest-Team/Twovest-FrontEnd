import Link from "next/link";
import Image from "next/image";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import UserItem from "./UserItem";
import GeneralItems from "./GeneralItems";
import MenuItem from "./MenuItem";
import getUserCartProducts from "@/utils/db/cart/getUserCartProducts";

export const revalidate = 0

const Navbar = async({ children }) => {

    const user = await useAuthServer();
    const cart = user ? await getUserCartProducts(user.email) : null 

    const renderLogo = () => (
        <Link href={"/"} className="items-center flex">
            <Image
                src={"/static/images/logo_twovest_black.svg"}
                width={105}
                height={24}
                alt="Logo Twovest"
                className="navbar_logo-xs"
            ></Image>

            <Image
                src={"/static/images/logo_twovest_black.svg"}
                width={130}
                height={24}
                alt="Logo Twovest"
                className="navbar_logo-sm"
            ></Image>
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
            <GeneralItems cart={cart} user={user} />
            <UserItem user={user} />
        </div>
    )

    return (
        <nav className="w-full fixed top-0 h-[75px] bg-white z-30 border-b border-gray-200">
            <div className="container h-full flex justify-between items-center">
                {renderLeft()}
                {renderRight()}
                {children}
            </div>
        </nav>
    )
}

export default Navbar