import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { changeUserData } from "@/redux/slices/userSlice";
import getAuth from "@/utils/db/auth/getAuth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.data);
  const [userChecked, setUserChecked] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userData = await getAuth();

        dispatch(changeUserData(userData));

        if (userData !== null && userData !== undefined) {
          setUserChecked(true);
        } else {
          setUserChecked(false);
        }
      } catch (error) {
        console.error("Erro ao obter dados :", error);
      }
    };

    getCurrentUser();
  }, [dispatch]);

  return { currentUser, userChecked, setUserChecked };
};

export default useAuth;
