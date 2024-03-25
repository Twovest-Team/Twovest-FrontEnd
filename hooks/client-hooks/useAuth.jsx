"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { changeUserData } from "@/redux/slices/userSlice";
import getAuth from "@/utils/db/auth/getAuth";
import { useState, useEffect } from "react";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.data);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    const data = await getAuth();
    if (data) {
      dispatch(changeUserData(data));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) getCurrentUser();
  }, [currentUser]);

  if (loading) return null;

  return currentUser || null;
};

export default useAuth;
