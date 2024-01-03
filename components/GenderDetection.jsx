'use client'

import getLocalStorage from "@/utils/localStorage/getLocalStorage"
import { useRouter } from "next/navigation"

const GenderDetection = ({children}) => {

  const router = useRouter()

  const gender = getLocalStorage('gender')
  if(!gender){
    router.push('/testagemEndpoints')
  }

  return (
    <>
      {children}
    </>
  )
}

export default GenderDetection