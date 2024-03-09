"use client";

import React from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import IconButton from "../buttons/icons/IconButton";

function NavigationTitle({ hasImageBehind, titleText, children }) {
  const router = useRouter();

  return (
    <div className={`flex flex-row justify-between items-center container h-20 ${hasImageBehind && 'text-white'}`}>

      <div className="font-semibold flex flex-row min-w-0 items-center z-10">
        <IconButton
          onClick={() => router.back()}
          icon={<KeyboardArrowLeft sx={{ fontSize: 29 }} />}
          className={'-translate-x-2.5'}
        />

        <h5 className="truncate cursor-default">{titleText}</h5>
      </div>

      {children}

    </div>
  );
}

export default NavigationTitle;
