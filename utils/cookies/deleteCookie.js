'use server'
 
import { cookies } from 'next/headers'
 
export default async function deleteCookie(name) {
  cookies().delete(name)
}