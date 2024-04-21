import React from "react";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function ProfileScores() {
  const totalClothes = 5;
  const accumulatedPoints = 331;

  return (
    
    <div className="flex items-start self-stretch gap-4">
      <div className="inline-block h-12 flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center self-stretch gap-2">
          <AutoModeOutlinedIcon />
          <h1 className=" text_h6">{accumulatedPoints}</h1>
        </div>
        <p className="caption text-secondary text-center justify-self-center">
          Pontos acumulados
        </p>
      </div>
      <div className="h-full ml-auto mr-auto border-l"></div>
      <div className="inline-block h-12 flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center self-stretch gap-2">
          <LocalOfferIcon />
          <h2 className=" text_h6">{totalClothes}</h2>
        </div>
        <p className="caption text-secondary text-center">
          Roupas entregues
        </p>
      </div>
    </div>
  );
}

export default ProfileScores;
