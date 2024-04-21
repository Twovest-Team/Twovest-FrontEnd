import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const useAuth = () => {
  const currentUser = useAppSelector((state) => state.user.data);
  const [userChecked, setUserChecked] = useState(true);

  return { currentUser, userChecked, setUserChecked };
};

export default useAuth;
