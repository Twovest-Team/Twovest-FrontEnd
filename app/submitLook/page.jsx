"use client";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import React, { useState, useEffect } from "react";

export default function LookSubmission() {
  const [timer, setTimer] = useState(5);
  const [buttonColor, setButtonColor] = useState("disabledMain");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    if (timer === 0) {
      setButtonColor("defaultMain");
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleButtonClick = () => {
    window.location.href = "/formLook";
  };

  return (
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
                  <li>Uso de 2 ou mais peças de roupa comprada na Twovest</li>
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
              <div className=" w-full" onClick={handleButtonClick}>
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
      </div>
    </>
  );
}
