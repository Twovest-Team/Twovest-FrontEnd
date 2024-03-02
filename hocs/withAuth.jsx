'use client'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import getUserData from '@/utils/db/getUserByEmail'
import { changeUserData } from '@/redux/slices/userSlice'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const withAuth = (WrappedComponent) => {

  const WithAuth = (props) => {

    const dispatch = useAppDispatch()
    let authData = useAppSelector(state => state.user.data)

    useEffect(() => {

        async function fetchUserData() {
            if (!authData) {
                let currentUser = await getUserData()
                dispatch(changeUserData(currentUser))
            }
        }

        fetchUserData()

    }, [authData])

    async function handleLogout(){
        const supabase = createClientComponentClient();
        await supabase.auth.signOut()
        dispatch(changeUserData(null));
    }


    return <WrappedComponent {...props} currentUser={authData || null} logout={handleLogout} />;
  }

  return WithAuth

}

export default withAuth