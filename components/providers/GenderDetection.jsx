'use client'

import getLocalStorage from "@/utils/localStorage/getLocalStorage";
import setLocalStorage from "@/utils/localStorage/setLocalStorage";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

const GenderDetection = ({ children }) => {

  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

    const gender = getLocalStorage('gender')

    if (params.gender) {
      setLocalStorage('gender', params.gender)
    }

    //console.log(pathname.includes("gallery/look"))
    if(!gender && pathname === '/' || !gender && pathname === '/login' || !gender && pathname === '/register' && !gender && pathname === '/brands' || !gender && pathname.includes("gallery/look")){
      router.push('/landing')
    }else if(gender && pathname === '/landing'){
      router.push("/");
    }

  }, [params.gender, pathname, router])


return (
  <>
    {children}
  </>
)

}

export default GenderDetection