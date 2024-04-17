"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateView } from "@/redux/slices/layoutViews";
import useWindow from "@/hooks/client-hooks/useWindow";
import { useEffect } from "react";
import oneRowButton from "@/public/static/images/viewmodel-icons/1row.png";
import twoRowsButton from "@/public/static/images/viewmodel-icons/2rows.png";
import threeRowsButton from "@/public/static/images/viewmodel-icons/3rows.png";
import fourRowsButton from "@/public/static/images/viewmodel-icons/4rows.png";
import fiveRowsButton from "@/public/static/images/viewmodel-icons/5rows.png";
import Image from "next/image";
import IconButton from "../buttons/icons/IconButton";

const GridViews = () => {
  const { width, isMobile, isSm, isMd, isLg, isXl, is2Xl } = useWindow();
  const biggerThan350 = width > 530; // Custom value needed only for this use case

  const dispatch = useAppDispatch();

  function handleViewChange(viewNumber) {
    dispatch(updateView(viewNumber));
  }

  useEffect(() => {
    if (width && !biggerThan350) handleViewChange(1);
    if (isMd) handleViewChange(2);
    if (isLg) handleViewChange(3);
    if (isXl || is2Xl) handleViewChange(4);
  }, [width, isSm, isMd, isMd, isLg, isXl, is2Xl]);

  if (width && biggerThan350) {
    return (
      <div
        className={`items-center justify-between text-secondary w-fit flex gap-x-3`}
      >
        {(isMobile || isSm) && (
          <IconButton
            icon={
              <Image
                src={oneRowButton}
                height={30}
                width={30}
                alt="Mudar para visualização em uma coluna"
                onClick={() => handleViewChange(1)}
              />
            }
          />
        )}

        {(isMobile || isSm || isMd) && (
          <IconButton
            icon={
              <Image
                src={twoRowsButton}
                height={30}
                width={30}
                alt="Mudar para visualização em duas colunas"
                onClick={() => handleViewChange(2)}
              />
            }
          />
        )}

        {(isMd || isLg) && (
          <IconButton
            icon={
              <Image
                src={threeRowsButton}
                height={30}
                width={30}
                alt="Mudar para visualização em três colunas"
                onClick={() => handleViewChange(3)}
              />
            }
          />
        )}

        {(isLg || isXl || is2Xl) && (
          <IconButton
            icon={
              <Image
                src={fourRowsButton}
                height={30}
                width={30}
                alt="Mudar para visualização em quatro colunas"
                onClick={() => handleViewChange(4)}
              />
            }
            className={"w-12 h-12"}
          />
        )}

        {(isXl || is2Xl) && (
          <IconButton
            icon={
              <Image
                src={fiveRowsButton}
                height={30}
                width={30}
                alt="Mudar para visualização em cinco colunas"
                onClick={() => handleViewChange(5)}
              />
            }
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default GridViews;
