'use client'

import IconButton from "../buttons/icons/IconButton";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartToggle";
import NotificationNumber from "../items/NotificationNumber";
import { openModal } from "@/redux/slices/modalSlice";

const GeneralItems = ({ user }) => {

    const dispatch = useAppDispatch();

    //const handleSearch = () => alert('Por fazer.')
    //const handleWishlist = () => alert('Por fazer.')

    const handleCart = () => {
        if (user) dispatch(toggleCart())
        if (!user) dispatch(openModal('authModal'))
    }

    let cartStore = useAppSelector((state) => state.cartProducts.products);

    return (
        <div className="flex items-center gap-2.5 mr-2.5 sm:mr-4">

            <IconButton
                /* onClick={handleSearch} */
                icon={<SearchIcon />}
                ariaLabel="Botão de pesquisa"
            />

            <IconButton
                /* onClick={handleWishlist} */
                icon={<FavoriteBorderOutlinedIcon />}
                ariaLabel="Os meus favoritos"
            />

            <div className="relative">
                <IconButton
                    icon={<LocalMallOutlinedIcon />}
                    onClick={handleCart}
                    ariaLabel="Aceder ao carrinho de compras"
                />
                <div className="cursor-pointer" onClick={handleCart}>
                    {user && cartStore.length > 0 && <NotificationNumber number={cartStore.length} />}
                </div>
            </div>
        </div>
    )
}

export default GeneralItems