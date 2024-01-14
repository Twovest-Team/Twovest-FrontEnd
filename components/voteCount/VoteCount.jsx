import React from "react";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function VoteCount() {
  const totalClothes = 5;
  const accumulatedPoints = 331;

  return (
    
    <div className="flex items-start self-stretch gap-4">
      <div className="inline-block h-12 flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center self-stretch gap-2">
          <AutoModeOutlinedIcon />
          <h6>{accumulatedPoints}</h6>
        </div>
        <p className="caption text-neutral-400 text-sm font-normal text-center justify-self-center">
          Pontos acumulados
        </p>
      </div>
      <div className="h-full ml-auto mr-auto border-l"></div>
      <div className="inline-block h-12 flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center self-stretch gap-2">
          <LocalOfferIcon />
          <h6>{totalClothes}</h6>
        </div>
        <p className="caption text-neutral-400 text-sm font-normal text-center">
          Roupas entregues
        </p>
      </div>
    </div>
  );
}

export default VoteCount;
