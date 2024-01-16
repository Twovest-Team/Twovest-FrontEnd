"use client";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import React, { useState, useEffect } from "react";
export default function LookSubmission() {
  const [timer, setTimer] = useState(5);
  const [buttonColor, setButtonColor] = useState("disabledMain");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer > 0 ? timer - 1 : 0);
    }, 1000);
    if (timer === 0) {
      setButtonColor("defaultMain");
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <>
      <NavigationTitle titleText="Submissão de look" />
      <div className="container mx-auto p-4 overflow-hidden">
        <div className="overlap relative mt-10">
          <div className="overlap-group relative ">
            <div className="ellipse overflow-hidden "></div>
            <div className="label relative z-10 mt-24 mx-12 mb-48 ">
              <h6 className="text-wrapper mb-10">
                Requisitos para submissão de Look
              </h6>
              <div className="obrigat-rio-wrapper mb-28">
                <ul className="list-disc">
                  <li className="obrigat-rio">
                    <span className="span">
                      Obrigatório preencher todos os campos que tenham “
                    </span>
                    <span className="text-wrapper-11">*</span>
                    <span className="span">”</span>
                  </li>
                  <li className="obrigat-rio">Tem de conter 1 foto</li>
                  <li className="obrigat-rio">
                    Tem de conter 1 estilo associado
                  </li>
                  <li className="obrigat-rio">
                    Uso de 2 ou mais peças de roupa comprada na Twovest
                  </li>
                  <li className="obrigat-rio">
                    Só poderás submeter um novo look após a verificação da
                    Twovest ao teu look anterior.
                  </li>
                </ul>
                <span className="text-wrapper-12">
                  Ver mais
                  <br />
                </span>
              </div>

              <Buttons
                btnState={buttonColor}
                text={`Compreendi (${timer})`}
                btnSize="mediumSizeSocials"
                disabled={timer > 0}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
