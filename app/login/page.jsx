"use client";

import { createBrowserClient } from '@supabase/ssr';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/db/supabase';

const Login = () => {


 async function LoginWithGoogle(){
  await supabase.auth.signInWithOAuth({
    provider: 'Google',
    options: {
      redirectTo: `https://nchduotxkzvmghizornd.supabase.co/auth/v1/callback`,
    },
  })
}


useEffect(() => {
  async function getUser(){
    const data = await supabase.auth.getUser()
    console.log(data)
  }
  getUser()
}, [])


  const LogOut = async() => {
   await supabase.auth.signOut();
  
  };

 

  return (
    <div>
      <div onClick={LoginWithGoogle}>Login</div>
      <div onClick={LogOut}>Logout</div>
    </div>
  );
};

export default Login;
