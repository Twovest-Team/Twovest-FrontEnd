"use client"

import SuccessCard from "../cards/SuccessCard";
import Button from "../buttons/Button";
import { GendersSelection } from "./GendersSelection";
import { useState } from "react";

export const OnboardingConclusion = () =>{

    const [showGendersSelection, setShowGendersSelection] = useState(false);

  const handleProsseguirClick = () => {
    setShowGendersSelection(true);
  };


    return (
        <main className="h-[100vh] mt-[-75px] bg-grey_opacity_50 flex justify-center items-center">
        {showGendersSelection ? (
          <GendersSelection />
        ) : (
          <SuccessCard>
            <div className="flex flex-col gap-6 mx-auto text-center">
              <div>
                <p
                  className="font-semibold mb-2"
                  aria-label="Pagamento efetuado com sucesso"
                >
                  Concluíste a introdução à Twovest
                </p>
                <p
                  className="text-secondary"
                  aria-label="Obrigado por comprar na Twovest"
                >
                  Escolhe agora um género para prosseguires com o uso da Twovest.
                </p>
              </div>
  
              <div className="mx-auto">
                <Button
                children={" Prosseguir ->"}
                  className="text-center"
                  aria-label="Prosseguir para escolhad e género"
                  onClick={handleProsseguirClick}
>
                </Button>
              </div>
            </div>
          </SuccessCard>
        )}
      </main>
      );
}