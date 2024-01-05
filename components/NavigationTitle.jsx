"use client";

import React from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function NavigationTitle({ titleText }) {
  const router = useRouter();

  return (
    <div className="font-semibold items-center py-5">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        <KeyboardArrowLeft />
      </a>
      {titleText}
    </div>
  );
}

export default NavigationTitle;
