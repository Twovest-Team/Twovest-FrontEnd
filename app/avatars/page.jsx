import { Avatar } from '@/components/user/Avatar'
import useAuthServer from '@/hooks/server-hooks/useAuthServer'
import React from 'react'

const page = async() => {

    const user = await useAuthServer()

    console.log(user)

    return (
        <div className='flex gap-2 h-screen justify-center items-center'>
            <Avatar user={user} size='sm' />
            <Avatar user={user} size='md' />
            <Avatar user={user} size='lg' />
            <Avatar user={user} size='xl' />
            <Avatar user={user} size='2xl' />
        </div>
    )
}

export default page