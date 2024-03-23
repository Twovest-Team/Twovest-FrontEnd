'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateGender } from "@/redux/slices/genderSlice";
import getGender from "@/utils/getGender";
import getLocalStorage from "@/utils/localStorage/getLocalStorage";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const isServer = typeof window === 'undefined';
const pagesThatAskForGender = ['/', '/login', '/register', '/brands', '/profile']

const GenderProvider = ({ children }) => {

  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [storedGender, setStoredGender] = useState(null);
  const stageGender = useAppSelector(state => state.gender.data);
  
  const initialize = () => {
    if (isServer) return null;
    try {
      const item = getLocalStorage('gender');
      if (item && !stageGender) dispatch(updateGender(item));
      if (!item && pagesThatAskForGender.indexOf(pathname) > -1) router.push('/landing');
      return item
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    if(!isServer) setStoredGender(initialize())
  }, [])

  // Gender validations every path change
  useEffect(() => {

    // Stop user from going to landing route on purpose
    if (storedGender && pathname === '/landing') router.push('/')

    // Check if url has a gender parameter. (String || False)
    const routeGender = params.genderString || false

    // // Redirect user to landing page when condition is true
    // if (!storedGender && pagesThatAskForGender.indexOf(pathname) > -1) {
    //   router.push('/landing')
    // }

    // Update gender state with the gender parameter in the url
    if(routeGender && ((storedGender && storedGender.string != routeGender) || !storedGender)){
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

export default GenderProvider