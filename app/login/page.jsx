'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { changeUserData } from "@/redux/slices/userSlice";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import Link from "next/link";


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
        return <h1 className="h-screen text-center"><div className="mt-4">Loading...</div></h1>
    }

    if (user) {
        return (
            <div className="h-screen bg-gray-100">
                <NavigationTitle/>
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
        <>
        <NavigationTitle titleText={"Iniciar sessão"}/>
         <main className="h-screen  p-6">

         <input type="text" placeholder="Email" className="px-4 py-4 w-full mb-4 rounded border border-grey"/>
         <input type="password" placeholder="Password" className="px-4 py-4 w-full rounded border border-grey"/>
        <Buttons btnState={"defaultMain"} text={"Iniciar sessão"} btnSize={"menuSize"}/>

            <div className="flex my-12 items-center">
                <div className="border-b border-grey w-full"></div>
                <div className="font-semibold mx-4">Ou</div>
                <div className="border-b border-grey w-full"></div>
            </div>
            
            <div className="">
    
                <Buttons
                    onClick={handleSignInGoogle}
                    btnState={"secondaryMain"} text={"Continuar com Google"} btnSize={"menuSize"}
                >
                    Sign In Google
                </Buttons>
                <Buttons
                    
                    btnState={"secondaryMain"} text={"Continuar com Facebook"} btnSize={"menuSize"}
                >
                    Sign In Google
                </Buttons>
                <Buttons
                    
                    btnState={"secondaryMain"} text={"Continuar com Apple"} btnSize={"menuSize"}
                >
                    Sign In Google
                </Buttons>
            </div>

            <div className="text-center mt-20">Não tens conta? <Link href={"/register"} className="text-primary_main font-semibold" >Regista-te com email.</Link>
            </div>

        </main>
        </>
       
    )

}