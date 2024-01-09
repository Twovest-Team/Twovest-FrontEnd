'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { changeUserData } from "@/redux/slices/userSlice";

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useAppDispatch()
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }

        getUser();
    }, [])


    const handleSignInGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'Google',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        })
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null)
        dispatch(changeUserData(null))
    }


    if (loading) {
        return <h1>loading..</h1>
    }

    if (user) {
        return (
            <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center">
                    <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                        You&apos;re already logged in
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    }

    return (
        <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
            <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
    
                <button
                    onClick={handleSignInGoogle}
                    className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none"
                >
                    Sign In Google
                </button>
            </div>
        </main>
    )

}