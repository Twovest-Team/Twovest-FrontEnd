// Se não tiver sessão iniciada deverá ser redirecionado para o login
// Exemplo: twovest.com/gallery/submit

"use client";

import NavigationTitle from "@/components/providers/NavigationTitle";
import { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
import useAuth from "@/hooks/client-hooks/useAuth";

const Submit = () => {

  const {currentUser} = useAuth()
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        return newTimer >= 0 ? newTimer : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  

  return (
    <>
      {currentUser && (
        <>
          <NavigationTitle titleText="Submissão de look" />
          <div className="container mx-auto p-4 look overflow-hidden">
            <div className="overlap relative mt-10">
              <div className="overlap-group relative ">
                <div className="ellipse overflow-hidden "></div>
                <div className="label relative z-10 mt-24 mx-auto mb-48 requeirements">
                  <h1 className="text-wrapper mb-10 mx-4 text_h6">
                    Requisitos para submissão de Look
                  </h1>
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

                  <Button
                  href="submitLook/formLook"
                  width="100%"
                  className="mx-auto"
                  disabled={timer > 0}
                  type='primary'
                  ariaLabel='Compreendi'>
                    Compreendi ({timer})
                  </Button>

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
