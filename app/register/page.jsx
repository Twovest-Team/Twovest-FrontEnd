'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingIcon from "@/components/buttons/icons/LoadingIcon";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import Link from "next/link";
// Não deve ser acessível a quem tem sessão iniciada.
// Quem entrar aqui com sessão deve automaticamente fazer signout e ser redirecionado para a página de login

const Register = () => {

  const router = useRouter()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();


  useEffect(() => {
      async function getUser() {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
          setLoading(false)
      }

      getUser();
  }, [])


if(user){
  router.push("/")
}

if (loading) {
  return <div className="h-screen text-center mt-24"><LoadingIcon/></div>
}

  return (

    <>
        <NavigationTitle titleText={"Registar conta"}/>
         <main className="h-screen p-6 mb-10">

          <div className="p-4 w-full border h-48 border-grey rounded mb-4 text-secondary"><div className="text-center mt-16">Adiciona aqui uma foto</div></div>

         <input type="text" placeholder="Nome" className="px-4 py-4 w-full mb-4 rounded border border-grey"/>
         <input type="text" placeholder="Email" className="px-4 py-4 w-full rounded border border-grey mb-4"/>
         <input type="password" placeholder="Password" className="px-4 py-4 w-full rounded border border-grey mb-4"/>
         <ul className="mb-8 mx-2 caption text-secondary">
          <li>A senha deve ter no mínimo 8 caracteres.</li>
          <li>Um número; </li>
          <li>Uma letra maiúscula; </li>
          <li>Um caractere especial (@, #, $, %, &).</li>
         </ul>
         <input type="password" placeholder="Confirmar password" className="px-4 py-4 w-full rounded border border-grey mb-4"/>
         <Buttons btnState="disabledMain" text="Registar conta" btnSize="menuSize"/>
         <div className="text-center mt-20">Já tens conta? <Link href={"/login"} className="text-primary_main font-semibold" >Inicia sessão aqui.</Link>
            </div>
        </main>

        
        </>
  )
}

export default Register