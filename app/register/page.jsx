'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingIcon from "@/components/buttons/icons/LoadingIcon";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import Link from "next/link";
import { ModalEmailVerification } from "@/components/modals/ModalEmailVerification";


const Register = () => {

  const router = useRouter()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const [teste, setTeste] = useState(false);

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")

  useEffect(() => {
      async function getUser() {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
          setLoading(false)
      }

      getUser();
  }, [])


const handleSignUp = async () => {
  console.log(email +" - " + password)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options:{
      data: {
        full_name: username,
        email: email,
        picture: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/sign/users_profile_pictures/user_profile-img.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2Vyc19wcm9maWxlX3BpY3R1cmVzL3VzZXJfcHJvZmlsZS1pbWcuanBnIiwiaWF0IjoxNzA5NjcyMjA4LCJleHAiOjIwMjUwMzIyMDh9.SmxAXHCwftd_KtfdgoYFuXVe7KmmlfWfG23aUuQ33VY"
      },
      emailRedirectTo: `${location.origin}/auth/callback`
    }
  })
  router.refresh();
  setEmail("")
  setPassword("")
  setUsername("")
  setTeste(true)
  console.log(data, error)

  /* if(data.session == null){

    return(
      <ModalEmailVerification/>
    )
      
  }
 */
  /* await supabase.auth.signUp({
    email,
    password,
    options:{
      emailRedirectTo: `${location.origin}/auth/callback`
    }
  })
  router.refresh();
  setEmail("")
  setPassword("")
  setUsername("") */
}



if(user){
  router.push("/")
}

if (loading) {
  return <div className="h-screen text-center mt-24"><LoadingIcon/></div>
}

if(teste==true){

  return (

    <ModalEmailVerification/>
  
  )
}else{
  return(
    <>
    <NavigationTitle titleText={"Registar conta"}/>
         <main className="p-6 mb-10">

          <div className="p-4 w-full border h-48 border-grey rounded mb-4 text-secondary"><div className="text-center mt-16">Adiciona aqui uma foto</div></div>

         <input type="text" 
         placeholder="Nome" 
         value={username} 
         onChange={(e)=> setUsername(e.target.value)} 
         className="px-4 py-4 w-full mb-4 rounded border border-grey"/>

         <input 
         type="text" 
         placeholder="Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)} 
         className="px-4 py-4 w-full rounded border border-grey mb-4"/>

         <input 
         type="password" 
         value={password}
         onChange={(e)=> setPassword(e.target.value)}
         placeholder="Password" 
         className="px-4 py-4 w-full rounded border border-grey mb-4"/>

         <ul className="mb-8 mx-2 caption text-secondary">
          <li>A senha deve ter no mínimo 8 caracteres.</li>
          <li>Um número; </li>
          <li>Uma letra maiúscula; </li>
          <li>Um caractere especial (@, #, $, %, &).</li>
         </ul>
         <input type="password" placeholder="Confirmar password" className="px-4 py-4 w-full rounded border border-grey mb-4"/> 
         <Buttons btnState="defaultMain" text="Registar conta" btnSize="menuSize" onClick={handleSignUp}/>
         <button onClick={handleSignUp}>SIGN UP</button>
         <div className="text-center mt-20">Já tens conta? <Link href={"/login"} className="text-primary_main font-semibold" >Inicia sessão aqui.</Link>
            </div>
        </main>
        </>
  )
}
  
}

export default Register