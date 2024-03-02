'use client'

import { useAppSelector } from "@/redux/hooks"
import React, { useEffect, useState } from "react"
import { useAppDispatch } from "@/redux/hooks";
import { updateHistory } from "@/redux/slices/historyProducts";
import addToLastProductsSeen from "@/utils/db/productsViewHistory/addToLastProductsSeen";
import { historyMaxLength } from "@/constants";
import removeFromUserHistory from "@/utils/db/productsViewHistory/removeFromUserHistory";
import orderUserHistory from "@/utils/db/productsViewHistory/orderUserHistory";
import getUserHistory from "@/utils/db/productsViewHistory/getUserHistory";
import withAuth from "@/hocs/withAuth";

const ProductHistoryDetection = ({ children, productId, currentUser }) => {

    const dispatch = useAppDispatch()
    const currentUserHistory = useAppSelector(state => state.historyProducts.products)
    let [isHistoryValidated, setIsHistoryValidated] = useState(false)

    async function addProduct() {
        await addToLastProductsSeen(productId, currentUser.email)
    }

    async function deleteProduct(oldestProductAdded) {
        await removeFromUserHistory(oldestProductAdded.products.id, currentUser.email)
    }

    async function updateProductsArray() {
        await orderUserHistory(productId, currentUser.email)
    }


    async function validateUserHistory() {
        let isIdInCurrentUserHistory = currentUserHistory.find(element => productId == element.products.id);
        let oldestProductAdded = currentUserHistory.slice(-1)[0];
        let doesHistoryChanged = false

        //console.log('valida!')

        if (isIdInCurrentUserHistory) {
            if (productId !== currentUserHistory[0].products.id) {
                await updateProductsArray();
            }
            doesHistoryChanged = true
        }

        if (!isIdInCurrentUserHistory && currentUserHistory.length < historyMaxLength) {
            await addProduct();
            doesHistoryChanged = true
        }

        if (!isIdInCurrentUserHistory && currentUserHistory.length === historyMaxLength) {
            deleteProduct(oldestProductAdded);
            await addProduct();
            doesHistoryChanged = true
        }

        if (doesHistoryChanged) {
            const data = await getUserHistory(currentUser.email)
            if (data) {
                dispatch(updateHistory(data))
            }
        }
    }


    useEffect(() => {

        if (currentUserHistory != null && !isHistoryValidated && currentUser) {
            validateUserHistory()
            setIsHistoryValidated(true)
        }

    }, [currentUserHistory])


    useEffect(() => {

        if (currentUser && currentUserHistory === null) {
            dispatch(updateHistory([]))
        }

    }, [currentUserHistory, currentUser]);



    return (
        <>
            {children}
        </>
    )
}

export default withAuth(ProductHistoryDetection)