'use client'

import { useAppSelector } from "@/redux/hooks"
import React, { useEffect } from "react"
import { useAppDispatch } from "@/redux/hooks";
import { updateHistory } from "@/redux/slices/historyProducts";
import addToLastProductsSeen from "@/utils/db/productsViewHistory/addToLastProductsSeen";
import { historyMaxLength } from "@/constants";
import removeFromUserHistory from "@/utils/db/productsViewHistory/removeFromUserHistory";
import orderUserHistory from "@/utils/db/productsViewHistory/orderUserHistory";
import getUserHistory from "@/utils/db/productsViewHistory/getUserHistory";

const ProductHistoryDetection = ({ children, productId }) => {

    const dispatch = useAppDispatch()
    const currentUserHistory = useAppSelector(state => state.historyProducts.products)
    const currentUser = useAppSelector((state) => state.user.data);

    async function addProduct() {
        addToLastProductsSeen(productId, currentUser.email)
    }

    async function deleteProduct(oldestProductAdded) {
        removeFromUserHistory(oldestProductAdded.products.id, currentUser.email)
    }

    async function updateProductsArray() {
        orderUserHistory(productId, currentUser.email)
    }


    async function validateUserHistory() {
        let isIdInCurrentUserHistory = currentUserHistory.find(element => productId == element.products.id);
        let oldestProductAdded = currentUserHistory.slice(-1)[0];
        let doesHistoryChanged = false
    
        if (isIdInCurrentUserHistory) {
            if (productId !== currentUserHistory[0].products.id) {
                updateProductsArray();
            }
            doesHistoryChanged = true
        }
    
        if (!isIdInCurrentUserHistory && currentUserHistory.length < historyMaxLength) {
            addProduct();
            doesHistoryChanged = true
        }
    
        if (!isIdInCurrentUserHistory && currentUserHistory.length === historyMaxLength) {
            deleteProduct(oldestProductAdded);
            addProduct();
            doesHistoryChanged = true
        }

        if(doesHistoryChanged){
            const data = await getUserHistory(currentUser.email)
            if(data){
                dispatch(updateHistory(data))
            }
        }
    }

    useEffect(() => {
        if (currentUserHistory != null) {
            return () => validateUserHistory();
        }
    }, [currentUserHistory]);
    
    

    return (
        <>
            {children}
        </>
    )
}

export default ProductHistoryDetection