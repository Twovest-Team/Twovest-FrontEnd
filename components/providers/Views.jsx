"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateView } from "@/redux/slices/layoutViews";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { useEffect, useState } from "react";
import { Buttons } from "../buttons/Buttons";
import CropSquare from "@mui/icons-material/CropSquare";

const Views = () => {
  const dispatch = useAppDispatch(); // Para atualizar o state da view
  const currentView = useAppSelector((state) => state.layoutViews.currentValue); // Para ver o state da view atual
  const [windowWidth, setWindowWidth] = useState(""); // Para verificar a width da Window
  const minDisplayWidth = 350; // Tamanho minimo para fazer display do componente
  const icon = <CropSquareIcon sx={{ fontSize: 28 }} />;

  function handleViewChange(viewNumber) {
    dispatch(updateView(viewNumber));
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= minDisplayWidth) {
      handleViewChange(1);
    }
  }, [windowWidth]);

  return (
    <div
      className={`items-center justify-between  text-secondary w-fit  min-[350px]:flex -translate-x-1`}
    >
      <Buttons
        ariaLabel="Mudar para visualização em uma coluna"
        text=""
        icon={currentView === 1 ? "cropSquare2View" : "cropSquare"}
        btnSize="iconPack"
        onClick={() => handleViewChange(1)}
      />

      <Buttons
        ariaLabel="Mudar para visualização em duas colunas"
        text=""
        icon={currentView === 2 ? "cropSquare2View" : "cropSquare"}
        btnSize="iconPack"
        onClick={() => handleViewChange(2)}
      />

      <div
        className={`w-[2.4px] h-[18px] absolute top-[19px] left-14  -translate-x-1/2 ${
          currentView === 2 ? "bg-dark" : "bg-secondary"
        }`}
      ></div>
    </div>
  );
};

export default Views;
