"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavigationTitle from "@/components/providers/NavigationTitle";
import coloredGoogleIcon from "@/public/static/images/login/google_logo.svg";
import Link from "next/link";
import GeneralLoading from "@/components/loaders/GeneralLoading";
import Button from "@/components/buttons/Button";
import Image from "next/image";


export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSignInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "Google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`
      }
    });
  };

  const handleSignInEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.session != null && data.user != null) {
      setEmail("");
      setPassword("");
      router.push("/");
      const hardReloadPage = () => {
        window.location.reload(true);
      };
      hardReloadPage();
      //console.log(data)
    } else {
      //console.log(error)
      setPassword("");
      setLoginError("As credênciais de login estão erradas.");
    }
  };

  if (loading) {
    return <GeneralLoading />;
  }

  if (user) {
    router.push("/");
  }

  return (
    <>

      <div className="bg-black px-2 text-white w-full py-3 text-center flex justify-center text-caption font-semibold">
        Dada uma restrição de pedidos SMTP, aconselhamos à autenticação com o Google.
      </div>

      <main className="bg-gradient-to-b from-white to-grey_opacity_50">
        <div className="container w-full max-w-[550px] py-10 min-h-[calc(100vh-119px)] flex flex-col justify-center">

          <div className="flex flex-col items-center justify-center gap-0.5 mb-8">
            <h1 className="text-h3 sm:text-h2">Olá novamente.</h1>
            <p className="text-caption sm:text-base text-secondary">Inicia sessão e começa a desfrutar.</p>
          </div>


          <div className="sm:bg-white bg-opacity-20 backdrop-blur-md
         sm:border border-grey rounded sm:py-8 sm:px-8 sm:mb-4">

            <label className="pb-2 inline-block text-caption font-semibold">Email</label>
            <input
              type="text"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 w-full mb-4 rounded border border-grey"
            />

            <label className="pb-2 inline-block text-caption font-semibold">Password</label>
            <input
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 w-full rounded border border-grey"
            />

            <div className="text-error_main my-2">{loginError}</div>

            <Button
              className="mt-8"
              type="primary"
              ariaLabel="Iniciar sessão com email e password"
              width="100%"
              onClick={handleSignInEmail}
            >
              Iniciar sessão
            </Button>

            <div className="flex my-10 items-center">
              <div className="border-b border-grey w-full"></div>
              <div className="font-semibold mx-4">Ou</div>
              <div className="border-b border-grey w-full"></div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                className="shadow-sm border border-grey"
                type={"white"}
                ariaLabel="Iniciar sessão com google"
                width="100%"
                onClick={handleSignInGoogle}
              >
                <Image
                  src={coloredGoogleIcon}
                  height={20}
                  width={20}
                  alt={"google icon"}
                  className="mr-1"
                />
                Continuar com Google
              </Button>

            </div>

            <div className="text-center pt-16">
              Não tens conta?{" "}
              <Link href={"/register"} className="text-black font-semibold">
                Regista-te com email.
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>

  );
}
