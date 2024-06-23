'use client'

//Icone de upvote, com e sem preenchimento
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import formatCompactNumbers from "@/utils/formatCompactNumbers";
import { useState } from "react";
import ForwardIcon from '@mui/icons-material/Forward';

export default function LookUpvoteButton({ upvotes }) {

  const [totalUpvotes, setTotalUpvotes] = useState(upvotes || 0)
  const [upvoted, setUpvoted] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation();
    setUpvoted(true)
    setTotalUpvotes(upvotes + 1)
  }

  return (
    <button onClick={(e) => handleClick(e)} className="absolute top-3 right-3 hover:shadow-2xl text-white px-4 h-[40px] bg-black bg-opacity-70 hover:bg-opacity-100 transition-all duration-150 rounded-full justify-center items-center inline-flex gap-0.5 z-10">

      {upvoted ?
        <ForwardIcon
          className="-rotate-90"
          ariaLabel="Botão de upvote"
          sx={{ fontSize: 24 }}
        />
        :
        <ForwardOutlinedIcon
          className="-rotate-90"
          ariaLabel="Botão de upvote"
          sx={{ fontSize: 24 }}
        />
      }

      {totalUpvotes > 0 &&
        <div className="text-center">
          <h1 className="font-medium text-[16px]">
            {formatCompactNumbers(totalUpvotes)}
          </h1>
        </div>
      }

    </button>
  );
}
