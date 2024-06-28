'use client'

//Icone de upvote, com e sem preenchimento
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import formatCompactNumbers from "@/utils/formatCompactNumbers";
import { useState } from "react";
import ForwardIcon from '@mui/icons-material/Forward';
import useAuth from "@/hooks/client-hooks/useAuth";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";

export default function LookUpvoteButton({ upvotes }) {

  const currentUser = useAuth()
  const [totalUpvotes, setTotalUpvotes] = useState(upvotes || 0)
  const [upvoted, setUpvoted] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = (e) => {
    e.stopPropagation();
    if (currentUser) {
      setUpvoted(true)
      setTotalUpvotes(upvotes + 1)
    }else{
      dispatch(openModal('authModal'))
    }

  }

  return (
    <button onClick={(e) => handleClick(e)} className="hover:shadow-2xl text-white px-4 h-[40px] bg-black bg-opacity-70 hover:bg-opacity-100 transition-all duration-150 rounded-full justify-center items-center inline-flex gap-0.5 z-10">

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
