"use client";

import React from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function NavigationTitle({ titleText, children }) {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between pt-6 pb-7 items-center gap-5">

      <button onClick={() => router.back()} className="font-semibold flex flex-row gap-2 items-center container">
        <KeyboardArrowLeft sx={{ fontSize: 29 }} />
        <h5>{titleText}</h5>
      </button>

      {children}

    </div>
  );
}

export default NavigationTitle;
