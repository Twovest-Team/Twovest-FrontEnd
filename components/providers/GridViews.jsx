"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateView } from "@/redux/slices/layoutViews";
import useWindow from "@/hooks/client-hooks/useWindow";
import { useEffect, useState } from "react";
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import Looks5OutlinedIcon from '@mui/icons-material/Looks5Outlined';
import IconButton from "../buttons/icons/IconButton";
import { minWidthGrid } from "@/constants";

const GridViews = () => {
  const { width, isMobile, isSm, isMd, isLg, isXl, is2Xl } = useWindow();

  const dispatch = useAppDispatch();

  const [currentView, setCurrentView] = useState(
    useAppSelector((state) => {
        console.log("currentView")
        if (state.layoutView) {
          return state.layoutView.currentValue;
        } else {
          return null
        }
      })
  )

  function handleViewChange(viewNumber) {
    dispatch(updateView(viewNumber)); //Acham que vale a pena deixar isto? Ou é melhor só usar o state local? --> Dani :)
    setCurrentView(viewNumber);
  }

  useEffect(() => {
    console.log('entrou aqui')
    if (width <= minWidthGrid) {
      console.log("1 if", currentView)
      handleViewChange(1);
    }
    if ((width > minWidthGrid || isSm || isMd) && width < 1024) {
      console.log("2 if", currentView)
      handleViewChange(2);
    }
    if (isLg) {
      console.log("3 if", currentView)
      handleViewChange(3);
    }
    if (isXl || is2Xl) {
      console.log("2 if", currentView)
      handleViewChange(4);
    }
  }, [width, isSm, isMd, isLg, isXl, is2Xl]);

  if (width && width > minWidthGrid) {
    return (
      <div
        className={`items-center justify-between text-neutral-300 w-fit flex gap-x-3`}
      >
        {(isMobile || isSm) && (
          <IconButton 
            icon={
              currentView!== null && currentView === 1? 
                <LooksOneOutlinedIcon sx={{ fontSize: 40 }} className="text-black" /> : 
                <LooksOneOutlinedIcon sx={{ fontSize: 40 }} className="text-neutral-300 hover:text-black" />
            }
            alt="Mudar para visualização em uma coluna"
            onClick={() => handleViewChange(1)}
          />
        )}

        {(isMobile || isSm || isMd) && (
          <IconButton
            icon={
              currentView!== null && currentView === 2? 
                <LooksTwoOutlinedIcon sx={{ fontSize: 40 }} className="text-black" /> : 
                <LooksTwoOutlinedIcon sx={{ fontSize: 40 }} className="text-neutral-300 hover:text-black" />
            }
            alt="Mudar para visualização em duas colunas"
            onClick={() => handleViewChange(2)}
          />
        )}

        {(isMd || isLg) && (
          <IconButton
            icon={
              currentView!== null && currentView === 3? 
                <Looks3OutlinedIcon sx={{ fontSize: 40 }} className="text-black" /> : 
                <Looks3OutlinedIcon sx={{ fontSize: 40 }} className="text-neutral-300 hover:text-black" />
            }
            alt="Mudar para visualização em três colunas"
            onClick={() => handleViewChange(3)}
          />
        )}

        {(isLg || isXl || is2Xl) && (
          <IconButton
            icon={
              currentView!== null && currentView === 4? 
                <Looks4OutlinedIcon sx={{ fontSize: 40 }} className="text-black" /> : 
                <Looks4OutlinedIcon sx={{ fontSize: 40 }} className="text-neutral-300 hover:text-black" />
            }
            alt="Mudar para visualização em quatro colunas"
            onClick={() => handleViewChange(4)}
            className={"w-12 h-12"}
          />
        )}

        {(isXl || is2Xl) && (
          <IconButton
            icon={
              currentView!== null && currentView === 5? 
                <Looks5OutlinedIcon sx={{ fontSize: 40 }} className="text-black" /> : 
                <Looks5OutlinedIcon sx={{ fontSize: 40 }} className="text-neutral-300 hover:text-black" />
            }
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

export default GridViews;