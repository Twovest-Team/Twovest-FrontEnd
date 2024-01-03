"use client";

import React from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function NavigationTitle({ titleText }) {
  const router = useRouter();

  return (
    <h5 className="font-semibold pt-6 pb-7 gap-4">
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
    </h5>
  );
}

export default NavigationTitle;
