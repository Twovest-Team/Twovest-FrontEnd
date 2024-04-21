'use client'

import { useAppDispatch } from "@/redux/hooks";
import { changeUserData } from "@/redux/slices/userSlice";
import getAuth from "@/utils/db/auth/getAuth";
import { useEffect } from "react";

const UserProvider = ({ children }) => {

  const dispatch = useAppDispatch();

  useEffect(() => {

    const fetchUserData = async () => {
      const user = await getAuth()
      if (user) dispatch(changeUserData(user));
    }

    fetchUserData();

  }, [dispatch])

  return (
    <>
      {children}
    </>
  )
}

export default UserProvider