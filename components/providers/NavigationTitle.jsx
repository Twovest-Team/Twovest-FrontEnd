"use client";

import React from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function NavigationTitle({ titleText, children }) {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between items-center container h-20">

      <button onClick={() => router.back()} className="font-semibold flex flex-row items-center">
        <KeyboardArrowLeft sx={{ fontSize: 29 }} className="-translate-x-2.5" />
        <h5>{titleText}</h5>
      </button>

      {children}

    </div>
  );
}

export default NavigationTitle;
