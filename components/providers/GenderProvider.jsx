'use client'

import { genders } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateGender } from "@/redux/slices/genderSlice";
import getGender from "@/utils/getGender";
import getLocalStorage from "@/utils/localStorage/getLocalStorage";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

const GenderProvider = ({ children }) => {

  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // Current state gender object
  const genderState = useAppSelector(state => state.gender.data);

  // Saved gender object in localstorage
  const genderLocal = (typeof window !== "undefined") && getLocalStorage('gender');

  // Pages where user is redirected to landing if there is no gender saved locally or in state
  const pagesThatAskForGender = ['/', '/login', '/register', '/brands']

  // Update gender state if there is a local gender value
  useEffect(() => {
    if (genderLocal && !genderState) dispatch(updateGender(genderLocal))
  }, [])

  // Gender validations every route or state change
  useEffect(() => {

    // Stop user from going to landing route on purpose
    if (genderLocal && pathname === '/landing') router.push('/')

    // Check if url has a gender parameter. (String || False)
    const routeGender = params.genderString || false

    // Redirect user to landing page when condition is true
    if (!genderLocal && pagesThatAskForGender.indexOf(pathname) > -1) {
      router.push('/landing')
    }

    // Update gender state with the gender parameter in the url
    if(routeGender && ((genderLocal && genderLocal.string != routeGender) || !genderLocal)){
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