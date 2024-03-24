"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateView } from "@/redux/slices/layoutViews";
import useWindow from "@/hooks/client-hooks/useWindow";
import { useEffect } from "react";

const Views = () => {

  const { width, isMobile, isSm, isMd, isLg, isXl, is2Xl } = useWindow()
  const biggerThan350 = width > 530 // Custom value needed only for this use case

  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.layoutViews.currentValue);

  function handleViewChange(viewNumber) {
    dispatch(updateView(viewNumber));
  }

  useEffect(() => {
    console.log(width && !biggerThan350)
    if (width && !biggerThan350) handleViewChange(1);
    if (isMd) handleViewChange(2);
    if (isLg) handleViewChange(3);
    if (isXl || is2Xl) handleViewChange(4);
  }, [,width])


  if (width && biggerThan350) {
    return (
      <div
        className={`items-center justify-between text-secondary w-fit flex -translate-x-1`}
      >

        {(isMobile || isSm) &&
          <button className="border-2 border-black px-2 mx-2"
            ariaLabel="Mudar para visualização em uma coluna"
            icon={currentView === 1 ? "cropSquare2View" : "cropSquare"}
            onClick={() => handleViewChange(1)}
          >1</button>
        }


        {(isMobile || isSm || isMd) &&
          <button className="border-2 border-black px-2 mx-2"
            ariaLabel="Mudar para visualização em duas colunas"
            icon={currentView === 2 ? "cropSquare2View" : "cropSquare"}
            onClick={() => handleViewChange(2)}
          >2</button>

        }

        {(isMd || isLg) &&
          <button className="border-2 border-black px-2 mx-2"
            ariaLabel="Mudar para visualização em duas colunas"
            icon={currentView === 3 ? "cropSquare2View" : "cropSquare"}
            onClick={() => handleViewChange(3)}
          >3</button>
        }

        {(isLg || isXl || is2Xl) &&
          <button className="border-2 border-black px-2 mx-2"
            ariaLabel="Mudar para visualização em duas colunas"
            icon={currentView === 4 ? "cropSquare2View" : "cropSquare"}
            onClick={() => handleViewChange(4)}
          >4</button>
        }

        {(isXl || is2Xl) &&
          <button className="border-2 border-black px-2 mx-2"
            ariaLabel="Mudar para visualização em duas colunas"
            icon={currentView === 5 ? "cropSquare2View" : "cropSquare"}
            onClick={() => handleViewChange(5)}
          >5</button>
        }

      </div>
    );
  } else {
    return null
  }

};

export default Views;
