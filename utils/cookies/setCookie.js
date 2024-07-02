'use server'

import { cookies } from 'next/headers'

export default async function setCookie(name, data) {
    const oneYear = 365 * 24 * 60 * 60 * 1000 // One year in milliseconds
    const value = JSON.stringify(data)
    cookies().set(name, value, { expires: Date.now() + oneYear })
}