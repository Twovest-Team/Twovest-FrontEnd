"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavigationTitle from "@/components/providers/NavigationTitle";
import coloredGoogleIcon from "@/public/static/images/login/google_logo.svg";
import coloredFacebookIcon from "@/public/static/images/login/facebook_logo.svg";
import coloredAppleIcon from "@/public/static/images/login/aple_logo.svg";
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
      provider: "Google"
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
      <NavigationTitle titleText={"Iniciar sessão"} />
      <main className="p-6 lg:px-52 md:px-32 ">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-4 w-full mb-4 rounded border border-grey"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-4 w-full rounded border border-grey"
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

        <div className="flex my-12 items-center">
          <div className="border-b border-grey w-full"></div>
          <div className="font-semibold mx-4">Ou</div>
          <div className="border-b border-grey w-full"></div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type={"black"}
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

          <Button
            type={"black"}
            ariaLabel="Iniciar sessão com Facebook"
            width="100%"
          >
            <Image
              src={coloredFacebookIcon}
              height={22}
              width={22}
              alt={"facebook icon"}
              className="mr-1"
            />
            Continuar com Facebook
          </Button>

          <Button
            type={"black"}
            ariaLabel="Iniciar sessão com Apple"
            width="100%"
          >
            <Image
              src={coloredAppleIcon}
              height={20}
              width={20}
              alt={"apple icon"}
              className="mr-1"
            />
            Continuar com Apple
          </Button>
        </div>

        <div className="text-center my-20">
          Não tens conta?{" "}
          <Link href={"/register"} className="text-primary_main font-semibold">
            Regista-te com email.
          </Link>
        </div>
      </main>
    </>
  );
}
