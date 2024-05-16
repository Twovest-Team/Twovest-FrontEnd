'use server'

import { cookies } from 'next/headers'
 
export default async function getCookie(name) {
  const cookieStore = cookies()
  const cookie = cookieStore.get(name)

  if (!cookie || !cookie.value) {
    // Cookie doesn't exist or doesn't have a value
    return null; // or handle the absence of the cookie in another way
  }

  return JSON.parse(cookie.value)
}
