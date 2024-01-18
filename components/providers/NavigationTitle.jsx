"use client";

import React from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function NavigationTitle({ hasImageBehind, titleText, children }) {
  const router = useRouter();

  return (
    <div className={`flex flex-row justify-between items-center container h-20 ${hasImageBehind && 'text-white'}`}>

      <button onClick={() => router.back()} className="font-semibold flex flex-row min-w-0 items-center z-10">
        <KeyboardArrowLeft sx={{ fontSize: 29 }} className="-translate-x-2.5" />
        <h5 className="truncate">{titleText}</h5>
      </button>

      {children}

    </div>
  );
}

export default NavigationTitle;
