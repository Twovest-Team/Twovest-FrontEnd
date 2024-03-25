"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateView } from "@/redux/slices/layoutViews";
import useWindow from "@/hooks/client-hooks/useWindow";
import { useEffect } from "react";
import oneRowButton from "@/public/images/viewmodel-icons/1row.png";
import twoRowsButton from "@/public/images/viewmodel-icons/2rows.png";
import threeRowsButton from "@/public/images/viewmodel-icons/3rows.png";
import fourRowsButton from "@/public/images/viewmodel-icons/4rows.png";
import fiveRowsButton from "@/public/images/viewmodel-icons/5rows.png";
import Image from "next/image";

const Views = () => {
  const { width, isMobile, isSm, isMd, isLg, isXl, is2Xl } = useWindow();
  const biggerThan350 = width > 530; // Custom value needed only for this use case

  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.layoutViews.currentValue);

  function handleViewChange(viewNumber) {
    dispatch(updateView(viewNumber));
  }

  useEffect(() => {
    if (width && !biggerThan350) handleViewChange(1);
    if (isMd) handleViewChange(2);
    if (isLg) handleViewChange(3);
    if (isXl || is2Xl) handleViewChange(4);
  }, [, width]);

  if (width && biggerThan350) {
    return (
      <div
        className={`items-center justify-between text-secondary w-fit flex gap-x-3`}
      >
        {(isMobile || isSm) && (
          <Image
            src={oneRowButton}
            height={30}
            width={30}
            alt="Mudar para visualização em uma coluna"
            onClick={() => handleViewChange(1)}
          />
        )}

        {(isMobile || isSm || isMd) && (
          <Image
            src={twoRowsButton}
            height={30}
            width={30}
            alt="Mudar para visualização em duas colunas"
            onClick={() => handleViewChange(2)}
          />
        )}

        {(isMd || isLg) && (
          <Image
            src={threeRowsButton}
            height={30}
            width={30}
            alt="Mudar para visualização em três colunas"
            onClick={() => handleViewChange(3)}
          />
        )}

        {(isLg || isXl || is2Xl) && (
          <Image
            src={fourRowsButton}
            height={30}
            width={30}
            alt="Mudar para visualização em quatro colunas"
            onClick={() => handleViewChange(4)}
          />
        )}

        {(isXl || is2Xl) && (
          <Image
            src={fiveRowsButton}
            height={30}
            width={30}
            alt="Mudar para visualização em cinco colunas"
            onClick={() => handleViewChange(5)}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Views;
