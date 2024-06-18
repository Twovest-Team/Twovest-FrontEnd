'use client'

import IconButton from "../buttons/icons/IconButton";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { updateCart } from "@/redux/slices/cartProducts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartToggle";
import NotificationNumber from "../items/NotificationNumber";
import { useEffect } from "react";

const GeneralItems = ({ user, cart }) => {

    const dispatch = useAppDispatch();

    const handleSearch = () => alert('Por fazer.')

    const handleWishlist = () => alert('Por fazer.')

    const handleCart = () => dispatch(toggleCart())

    useEffect(() => {
        if (cart) dispatch(updateCart(cart));
    }, [])

    let cartStore = useAppSelector((state) => state.cartProducts.products);

    // This compares the values from the server and the store.
    const getCartLength = () => (
        cartStore.length === 0 ? cart.length : cartStore.length
    )

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
                    {user && cart.length > 0 && <NotificationNumber number={getCartLength()} />}
                </div>
            </div>
        </div>
    )
}

export default GeneralItems