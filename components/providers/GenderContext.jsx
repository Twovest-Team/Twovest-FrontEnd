'use client'

import { genders } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateGender } from "@/redux/slices/genderSlice";
import getGender from "@/utils/getGender";
import getLocalStorage from "@/utils/localStorage/getLocalStorage";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const isServer = typeof window === 'undefined';
const pagesThatAskForGender = ['/', '/login', '/register', '/brands', '/profile']

const GenderContext = ({ children }) => {

  const dispatch = useAppDispatch();
  const params = useParams();
  const pathname = usePathname();

  const [storedGender, setStoredGender] = useState(null);
  const stageGender = useAppSelector(state => state.gender.data);

  const initialize = () => {
    if (isServer) return null;
    try {
      const item = getLocalStorage('gender');
      if (item && !stageGender) dispatch(updateGender(item));
      if (!item && pagesThatAskForGender.indexOf(pathname) > -1) {
        dispatch(updateGender(genders[0]));
      }
      return item
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    if (!isServer) setStoredGender(initialize())
  }, [])

  // Gender validations every path change
  useEffect(() => {

    // Check if url has a gender parameter. (String || False)
    const routeGender = params.genderString || false

    // Update gender state with the gender parameter in the url
    if (routeGender && ((storedGender && storedGender.string != routeGender) || !storedGender)) {
      const routerGenderObject = getGender(routeGender);
      dispatch(updateGender(routerGenderObject))
    }

  }, [pathname])

  return (
    <>
      {children}
    </>
  )

}

export default GenderContext