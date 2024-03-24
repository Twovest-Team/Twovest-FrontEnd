"use client";

import React from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import IconButton from "../buttons/icons/IconButton";
import useWindow from "@/hooks/client-hooks/useWindow";

function NavigationTitle({ hasImageBehind, titleText, children }) {
  const router = useRouter();
  const { isLg } = useWindow()

  const handleBack = () => {
    router.back();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      router.back();
    }
  };
  return (
    <div
      className={`flex flex-row justify-between items-center container h-20 ${hasImageBehind && "text-white"
        }`}
    >
      <div
        className="font-semibold flex flex-row min-w-0 items-center z-10 focus:outline-dashed focus:ring-2 focus:ring-black rounded"
        onClick={handleBack}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {isLg &&
          <IconButton
            darkMode={hasImageBehind}
            icon={<KeyboardArrowLeft sx={{ fontSize: 29 }} />}
            className={"-translate-x-2.5"}
          />
        }
    
        <h5
          className="cursor-pointer transition-colors duration-200 hover:text-primary_dark"
          aria-label={`Está na página ${titleText}. Se clicar, será direcionado para a página anterior.`}
        >
          {titleText}
        </h5>
      </div>

      {children}
    </div>
  );
}

export default NavigationTitle;
