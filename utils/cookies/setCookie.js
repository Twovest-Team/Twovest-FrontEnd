'use server'

import { cookies } from 'next/headers'

export default async function setCookie(name, data) {
    const value = JSON.stringify(data)
    cookies().set(name, value, { expires: Date.now() + oneYear })
}