"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateView } from "@/redux/slices/layoutViews";
import useWindow from "@/hooks/client-hooks/useWindow";
import { useEffect, useState } from "react";
import { minWidthGrid } from "@/constants";

const GridViews = () => {
  const { width, isMobile, isSm, isMd, isLg, isXl, is2Xl } = useWindow();
  const dispatch = useAppDispatch();

  const initialView = useAppSelector((state) => state.layoutView?.currentValue ?? null);
  const [currentView, setCurrentView] = useState(initialView);

  const handleViewChange = (viewNumber) => {
    dispatch(updateView(viewNumber));
    setCurrentView(viewNumber);
  };

  useEffect(() => {
    if (width <= minWidthGrid) handleViewChange(1);
    else if (width < 1024) handleViewChange(2);
    else if (isLg) handleViewChange(3);
    else if (isXl || is2Xl) handleViewChange(4);
  }, [width, isSm, isMd, isLg, isXl, is2Xl]);

  const renderViewButton = (viewNumber) => (
    <p
      onClick={() => handleViewChange(viewNumber)}
      className={`cursor-pointer border-2 ${
        currentView === viewNumber ? "border-black text-black" : "border-grey text-grey"
      } font-bold w-8 h-8 flex items-center justify-center rounded`}
    >
      {viewNumber}
    </p>
  );

  if (width <= minWidthGrid) return null;

  return (
    <div className="items-center justify-between text-neutral-300 w-fit flex gap-x-3">
      {(isMobile || isSm) && renderViewButton(1)}
      {(isMobile || isSm || isMd) && renderViewButton(2)}
      {(isMd || isLg) && renderViewButton(3)}
      {(isLg || isXl || is2Xl) && renderViewButton(4)}
      {(isXl || is2Xl) && renderViewButton(5)}
    </div>
  );
};

export default GridViews;
