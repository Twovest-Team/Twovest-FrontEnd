/* "use client"

import { createBrowserClient } from '@supabase/ssr'
import { useEffect } from 'react';

// Quem entrar aqui com sessão deve automaticamente fazer signout 
const Login = () => {


  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

    
    const LogInWithGoogle =()=>{
      supabase.auth.signInWithOAuth({
        provider:"Google",
      options: {
        redirectTo:`${Location.origin}/auth-server-action/callback`
      }
      })
      console.log("login")
      }


    

      const LogOut = () =>{
        supabase.auth.signOut()
        console.log("logout")
      }

      

  return (
    <div>
      <div onClick={LogInWithGoogle}>Login</div>
      <div onClick={LogOut}>Logout</div>
    </div>
    
  )
}

export default Login */


"use client";

import { createBrowserClient } from '@supabase/ssr';
import { useEffect } from 'react';

const Login = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const storeUserDataInTable = async (user) => {
    const { data, error } = await supabase
      .from('users') // Supabase table
      .insert([
        {
          email: user.email,
          name: user.user_metadata.full_name, // Assuming user name is in the 'full_name' field
          img: user.user_metadata.avatar_url, // Assuming user image URL is in the 'avatar_url' field
        }
      ]);

    if (error) {
      console.error('Error storing user data:', error.message);
    } else {
      console.log('User data stored successfully:', data);
    }
  };

  useEffect(() => {
    // Subscribe to changes in authentication status
    const unsubscribe = supabase.auth.onAuthStateChange(async (event, session) => {
      // Check if the user has an active session
      if (session) {
        console.log('Yes');
        // Store user data in the "users" table
        await storeUserDataInTable(session.user);
      }
    });

    // Initial check for authentication status
    const session = supabase.auth.session;
    if (session) {
      console.log('Yes');
      // Store user data in the "users" table
      storeUserDataInTable(session.user);
    } else {
      console.log("NO");
    }

    // Cleanup subscription when the component unmounts
    /* return () => unsubscribe(); */
  }, []);

  const LogInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "Google",
      options: {
        redirectTo: `${Location.origin}/auth-server-action/callback`
      }
    });
    console.log("login");
  };

  const LogOut = () => {
    supabase.auth.signOut();
    console.log("logout");
  };

  return (
    <div>
      <div onClick={LogInWithGoogle}>Login</div>
      <div onClick={LogOut}>Logout</div>
    </div>
  );
};

export default Login;
