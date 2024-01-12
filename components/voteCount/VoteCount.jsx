import React from "react";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function VoteCount() {
  const totalClothes = 5;
  const accumulatedPoints = 331;

  return (
    <div className="points_upvotes">
      <div className="points_accumulated">
        <div className="points">
          <AutoModeOutlinedIcon />
          <h6>{accumulatedPoints}</h6>
        </div>
        <p className="caption text-neutral-400 text-sm font-normal text-center justify-self-center">
          Pontos acumulados
        </p>
      </div>
      <div className="div_grey-line2"></div>
      <div className="points_accumulated">
        <div className="points">
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
