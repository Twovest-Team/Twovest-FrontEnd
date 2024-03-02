'use client';

import { useRouter } from "next/navigation";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import Link from "next/link";
import withAuth from "@/hocs/withAuth";



function LoginPage({currentUser, loginGoogle}) {
    const router = useRouter()

    if (currentUser) {
        router.push("/")  
    }

    return (
        <>
        <NavigationTitle titleText={"Iniciar sessão"}/>
         <main className="p-6">

         <input type="text" placeholder="Email" className="px-4 py-4 w-full mb-4 rounded border border-grey"/>
         <input type="password" placeholder="Password" className="px-4 py-4 w-full rounded border border-grey"/>
        <Buttons btnState={"defaultMain"} text={"Iniciar sessão"} btnSize={"menuSize"}/>

            <div className="flex my-12 items-center">
                <div className="border-b border-grey w-full"></div>
                <div className="font-semibold mx-4">Ou</div>
                <div className="border-b border-grey w-full"></div>
            </div>
            
            <div className="">
    
                <div onClick={loginGoogle}><Buttons
                    
                    btnState={"secondaryMain"} text={"Continuar com Google"} btnSize={"mediumSizeSocials"} icon={"google"}
                >
                </Buttons></div>
                <Buttons
                    
                    btnState={"secondaryMain"} text={"Continuar com Facebook"} btnSize={"mediumSizeSocials"} icon={"facebook"}
                >
                    
                </Buttons>
                <Buttons
                    
                    btnState={"secondaryMain"} text={"Continuar com Apple"} btnSize={"mediumSizeSocials"} icon={"apple"}
                >
                   
                </Buttons>
            </div>

            <div className="text-center my-20">Não tens conta? <Link href={"/register"} className="text-primary_main font-semibold" >Regista-te com email.</Link>
            </div>

        </main>
        </>
       
    )

}

export default withAuth(LoginPage)