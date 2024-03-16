import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateGender } from "@/redux/slices/genderSlice";

const useGender = () => {
   const dispatch = useAppDispatch();
   const gender = useAppSelector(state => state.gender.data);
   
   const setGender = (newGender) => {
       dispatch(updateGender(newGender));
   };

   return [gender, setGender];
};

export default useGender;
