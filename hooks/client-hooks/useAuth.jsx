import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const useAuth = () => {
  const currentUser = useAppSelector((state) => state.user.data);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if(currentUser) setUserChecked(true)
    if(!currentUser) setUserChecked(false)
  }, [currentUser])

  return { currentUser, userChecked, setUserChecked };
};

export default useAuth;
