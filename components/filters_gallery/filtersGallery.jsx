"use client";

import getAllStyles from "@/utils/db/getAllStyles";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ContentSlider from "../sliders/ContentSlider";
import { Buttons } from "../buttons/Buttons";
import useScroll from "@/hooks/useScroll";

const Filters = ({ style, gender }) => {
  const [selectedFilter, setSelectedFilter] = useState(style);
  const [styles, setStyles] = useState([]);
  const router = useRouter();

  const [scrollX, scrollY ] = useScroll();

  useEffect(() => {
    const storeAllStyles = async () => {
      const allStyles = await getAllStyles();
      setStyles(allStyles);
    };

    storeAllStyles();
  }, []);

  const handleFilterChange = (style) => {
    if (style) {
      setSelectedFilter(style);
      router.push(`/gallery/${gender}?style=${style}`);
    } else {
      setSelectedFilter();
      router.push(`/gallery/${gender}`);
    }
  };

  return (
      <ContentSlider
      className={`sticky  top-[75px] z-10 bg-white  ${scrollY >= 75 ? 'transition-all duration-300 shadow-md h-24' : 'h-16'} flex items-center`}>

        <Buttons
          key="all"
          className={`filter-button ${!selectedFilter && "active"}`}
          aria-label="Todos"
          btnState={!selectedFilter ? "blackMain" : "whiteMain"}
          text="Todos"
          btnSize="filterSize"
          onClick={() => handleFilterChange()}
        ></Buttons>

        {styles.map((filter) => (
          <Buttons
            key={filter.id}
            className={`filter-button ${selectedFilter && selectedFilter === filter.name && "active"
              }`}
            aria-label={filter.name}
            btnState={selectedFilter === filter.name ? "activeMain" : "whiteMain"}
            text={filter.name}
            btnSize="filterSize"
            onClick={() => handleFilterChange(filter.name)}
          ></Buttons>
        ))}
      </ContentSlider>
  );
};

export default Filters;
