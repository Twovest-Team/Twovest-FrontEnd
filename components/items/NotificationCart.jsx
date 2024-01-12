'use client'

import getUserCartProducts from "@/utils/db/cart/getUserCartProducts"
import NotificationNumber from "./NotificationNumber"
import { updateCart } from "@/redux/slices/cartProducts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect } from "react"


const NotificationCart = () => {

    const dispatch = useAppDispatch()
    let products = useAppSelector(state => state.cartProducts.products)
    const currentUser = useAppSelector(state => state.user.data)

    useEffect(() => {

        if (currentUser) {
            async function getCartProducts() {
                const data = await getUserCartProducts(currentUser.email)
                if (data) {
                    dispatch(updateCart(data))
                }
            }

            getCartProducts()
        }

    }, [currentUser])

    return (
        <>
            {products.length > 0 && currentUser && <NotificationNumber number={products.length} />}
        </>
    )
}

export default NotificationCart