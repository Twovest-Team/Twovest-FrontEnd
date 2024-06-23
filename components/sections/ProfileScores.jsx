import React from "react";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function ProfileScores() {
  const totalClothes = 5;
  const accumulatedPoints = 331;

  return (

    <div className="flex flex-wrap justify-center items-center self-stretch gap-3">

      <div className="bg-grey_opacity_50 rounded-full px-5 py-3 text-caption font-semibold flex gap-1.5">
        <AutoModeOutlinedIcon className="text-warning_main" sx={{fontSize: 18}} />
        {accumulatedPoints} Pontos Acumulados
      </div>

      <div className="bg-grey_opacity_50 rounded-full px-5 py-3 text-caption font-semibold flex gap-1.5">
        <LocalOfferIcon className="text-info_main" sx={{fontSize: 17}} />
        {totalClothes} Roupas entregues
      </div>

    </div>
  );
}

export default ProfileScores;
