'use client'

import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { changeUserData } from "@/redux/slices/userSlice"
import getAuth from "@/utils/db/auth/getAuth"
import { useEffect } from "react"

const useAuth = () => {

    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => state.user.data)

    const getCurrentUser = async() => {
        const data = await getAuth()
        if (data) dispatch(changeUserData(data))
    }

    useEffect(() => {
        if(!currentUser) getCurrentUser()
    }, [])
    

   return currentUser || null

}

export default useAuth