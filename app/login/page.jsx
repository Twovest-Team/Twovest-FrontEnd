"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import Link from "next/link";
import GeneralLoading from "@/components/loadingSkeletons/GeneralLoading";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

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
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    //router.push("${location.origin}/auth/callback");
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
      <main className="p-6">
        <input
          type="text"
          placeholder="Email"
          className="px-4 py-4 w-full mb-4 rounded border border-grey"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-4 w-full rounded border border-grey"
        />
        <Buttons
          btnState={"defaultMain"}
          text={"Iniciar sessão"}
          btnSize={"menuSize"}
        />

        <div className="flex my-12 items-center">
          <div className="border-b border-grey w-full"></div>
          <div className="font-semibold mx-4">Ou</div>
          <div className="border-b border-grey w-full"></div>
        </div>

        <div className="">
          <div onClick={handleSignInGoogle}>
            <Buttons
              btnState={"secondaryMain"}
              text={"Continuar com Google"}
              btnSize={"mediumSizeSocials"}
              icon={"google"}
            ></Buttons>
          </div>
          <Buttons
            btnState={"secondaryMain"}
            text={"Continuar com Facebook"}
            btnSize={"mediumSizeSocials"}
            icon={"facebook"}
          ></Buttons>
          <Buttons
            btnState={"secondaryMain"}
            text={"Continuar com Apple"}
            btnSize={"mediumSizeSocials"}
            icon={"apple"}
          ></Buttons>
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
