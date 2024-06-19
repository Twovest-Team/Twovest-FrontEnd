'use client'

import IconButton from "../buttons/icons/IconButton";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { updateCart } from "@/redux/slices/cartProducts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartToggle";
import NotificationNumber from "../items/NotificationNumber";
import { useEffect, useState } from "react";

const GeneralItems = ({ user, cart }) => {

    const dispatch = useAppDispatch();

    const handleSearch = () => alert('Por fazer.')

    const handleWishlist = () => alert('Por fazer.')

    const handleCart = () => dispatch(toggleCart())

    const [cartQty, setCartQty] = useState(cart.length)
    let cartStore = useAppSelector((state) => state.cartProducts.products);

    useEffect(() => {
        if (cart) dispatch(updateCart(cart));
    }, [])

    useEffect(() => {
        setCartQty(cartStore.length)
    }, [cartStore])


    return (
        <div className="flex items-center gap-2.5 mr-4">

            <IconButton
                onClick={handleSearch}
                icon={<SearchIcon />}
                ariaLabel="Botão de pesquisa"
            />

            <IconButton
                onClick={handleWishlist}
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
                    {user && cartQty > 0 && <NotificationNumber number={cartQty} />}
                </div>
            </div>
        </div>
    )
}

export default GeneralItems