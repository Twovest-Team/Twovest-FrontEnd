import { useAppSelector } from "@/redux/hooks";

const useAuth = () => {
  const currentUser = useAppSelector((state) => state.user.data);
  return currentUser;
};

export default useAuth;
