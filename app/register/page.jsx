"use client"

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
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const [teste, setTeste] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser();
  }, []);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    const isValid = !/[{}"<>]/.test(emailValue);
    setEmail(emailValue);
    setEmailValid(isValid && (emailValue.includes("@") && (emailValue.includes(".pt") || emailValue.includes("@") && emailValue.includes(".com"))));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(validatePassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordValid(e.target.value === password && e.target.value.length > 7);
  };


  const handleUsernameChange = (e) => {
    const usernameValue = e.target.value;
    const isValid = !/[{}"<>]/.test(usernameValue);
    setUsername(usernameValue);
    setUsernameValid(isValid && usernameValue.length <= 25 && usernameValue.length >= 3);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username,
          email: email,
          picture: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/sign/users_profile_pictures/user_profile-img.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2Vyc19wcm9maWxlX3BpY3R1cmVzL3VzZXJfcHJvZmlsZS1pbWcuanBnIiwiaWF0IjoxNzA5NjcyMjA4LCJleHAiOjIwMjUwMzIyMDh9.SmxAXHCwftd_KtfdgoYFuXVe7KmmlfWfG23aUuQ33VY"
          
        },
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    });
    if (error) {
      console.error("Error signing up:", error.message);
      return;
    }
    setEmail("");
    setPassword("");
    setUsername("");
    setTeste(true);
    //console.log(data);
  };

  if (user) {
    router.push("/");
  }

  if (loading) {
    return <div className="h-screen text-center mt-24"><LoadingIcon/></div>;
  }

  if (teste == true) {
    return <ModalEmailVerification />;
  } else {
    return (
      <>
        <NavigationTitle titleText={"Registar conta"}/>
        <main className="p-6 mb-10">
          <div className="p-4 w-full border h-48 border-grey rounded mb-4 text-secondary">
            <div className="text-center mt-16">Adiciona aqui uma foto</div>
          </div>

          <input
            type="text"
            placeholder="Nome"
            value={username}
            onChange={handleUsernameChange}
            className={`px-4 py-4 w-full rounded border mb-4 ${usernameValid ? 'border-primary_main' : 'border-grey'}`}
          />
          {username.length > 25 && (
            <p className="text-error_main mb-4">Insere um nome com menos de 25 letras.</p>
          )}
          {username.length >= 1 && username.length < 3 && (
            <p className="text-error_main mb-4">Insere um nome com mais de 3 letras.</p>
          )}
          {username.length >= 3 && usernameValid && (
            <div className="text-primary_main mb-4">O username é válido.</div>
          )}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={ emailValid? "px-4 py-4 w-full rounded border border-primary_main mb-4"  : "px-4 py-4 w-full rounded border border-grey mb-4"}
          />
          {email.length > 4 && !emailValid && (
            <div className="text-error_main mb-4">O email é inválido.</div>
          )}
          {email.length > 4 && emailValid && (
            <div className="text-primary_main mb-4">O email é válido.</div>
          )}
          

          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className={passwordValid? "px-4 py-4 w-full rounded border border-primary_main mb-4" : "px-4 py-4 w-full rounded border border-grey mb-4"}
          />

          {password.length > 2 && !passwordValid && (
            <ul className="mb-8 mx-2 caption text-error_main">
              <li className={password.length >= 8 ? "text-green-500" : "text-red-500"}>A senha deve ter no mínimo 8 caracteres.</li>
              <li className={password.match(/[0-9]/) ? "text-green-500" : "text-red-500"}>Um número;</li>
              <li className={password.match(/[A-Z]/) ? "text-green-500" : "text-red-500"}>Uma letra maiúscula;</li>
              <li className={password.match(/[!@#$%^&*]/) ? "text-green-500" : "text-red-500"}>Um caractere especial (@, #, $, %, &).</li>
            </ul>
          )}
          {(!password || password.length <=2 ) && (
            <ul className="mb-8 mx-2 caption text-secondary">
              <li>A senha deve ter no mínimo 8 caracteres.</li>
              <li>Um número;</li>
              <li>Uma letra maiúscula;</li>
              <li>Um caractere especial (@, #, $, %, &).</li>
            </ul>
          )}
          {(passwordValid) && (
            <ul className="mb-8 mx-2 caption text-primary_main">
              <li>A senha deve ter no mínimo 8 caracteres.</li>
              <li>Um número;</li>
              <li>Uma letra maiúscula;</li>
              <li>Um caractere especial (@, #, $, %, &).</li>
            </ul>
          )}

<input
            type="password"
            placeholder="Confirmar password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={confirmPasswordValid ? "px-4 py-4 w-full rounded border border-primary_main mb-4" : "px-4 py-4 w-full rounded border border-grey mb-4"}
          />
          {!confirmPasswordValid && confirmPassword.length > 0 && (
            <div className="text-error_main mb-4">As senhas não coincidem.</div>
          )}
          {confirmPasswordValid && (
            <div className="text-primary_main mb-4">As senhas coincidem.</div>
          )}


          <button disabled={!emailValid || !passwordValid || !confirmPasswordValid || !confirmPassword } onClick={handleSignUp} className={(emailValid && passwordValid && usernameValid && confirmPasswordValid && confirmPassword) ? "bg-primary_main" : "bg-grey"}>SIGN UP</button>
          <div className="text-center mt-20">
            Já tens conta?{" "}
            <Link href={"/login"} className="text-primary_main font-semibold">
              Inicia sessão aqui.
            </Link>
          </div>
        </main>
      </>
    );
  }
};

export default Register;