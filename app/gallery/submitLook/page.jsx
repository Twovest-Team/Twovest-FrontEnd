// Se não tiver sessão iniciada deverá ser redirecionado para o login
// Exemplo: twovest.com/gallery/submit
"use client";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Buttons } from "@/components/buttons/Buttons";
import { useEffect, useState } from "react";
import GeneralLoading from "@/components/loadingSkeletons/GeneralLoading";
import Link from "next/link";

const Submit = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(5);
  const [buttonColor, setButtonColor] = useState("disabledMain");
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const { data: user, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    }
    getUser();
  }, [router, supabase.auth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        return newTimer >= 0 ? newTimer : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    if (timer === 0) {
      router.push("submitLook/formLook");
    }
  };

  useEffect(() => {
    if (timer === 0 && user) {
      setButtonColor("defaultMain");
    }
  }, [timer]);

  if (loading) {
    return <GeneralLoading />;
  }
  return (
    <>
      {user && (
        <>
          <NavigationTitle titleText="Submissão de look" className="titlenav" />
          <div className="container mx-auto p-4 look overflow-hidden">
            <div className="overlap relative mt-10">
              <div className="overlap-group relative ">
                <div className="ellipse overflow-hidden "></div>
                <div className="label relative z-10 mt-24 mx-auto mb-48 requeirements">
                  <h6 className="text-wrapper mb-10 mx-4 ">
                    Requisitos para submissão de Look
                  </h6>
                  <div className=" mb-28 subtitles mx-4">
                    <ul>
                      <li>
                        <span className="span">
                          Obrigatório preencher todos os campos que tenham
                        </span>
                        <span className="text-wrapper-11">*</span>
                      </li>
                      <li>Tem de conter 1 foto</li>
                      <li>Tem de conter 1 estilo associado</li>
                      <li>
                        Uso de 2 ou mais peças de roupa comprada na Twovest
                      </li>
                      <li>
                        Só poderás submeter um novo look após a verificação da
                        Twovest ao teu look anterior.
                      </li>
                    </ul>
                    <span>
                      Ver mais
                      <br />
                    </span>
                  </div>

                  <Buttons
                    btnState={buttonColor}
                    text={`Compreendi (${timer})`}
                    btnSize="mediumSizeSocials"
                    onClick={handleButtonClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Submit;
