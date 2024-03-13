"use client";

import getAllStyles from "@/utils/db/getAllStyles";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ContentSlider from "../sliders/ContentSlider";
import { Buttons } from "../buttons/Buttons";
const Filters = ({ style, gender }) => {
  const [selectedFilter, setSelectedFilter] = useState(style);
  const [styles, setStyles] = useState([]);
  const router = useRouter();

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
    <ContentSlider>
      <Buttons
        key="all"
        className={`filter-button ${!selectedFilter && "active"}`}
        aria-label="Todos"
        btnState={!selectedFilter ? "blackMain" : "whiteMain"}
        text="Todos"
        icon=""
        btnSize="filterSize"
        onClick={() => handleFilterChange()}
      ></Buttons>

      {styles.map((filter) => (
        <Buttons
          key={filter.id}
          className={`filter-button ${
            selectedFilter && selectedFilter === filter.name && "active"
          }`}
          aria-label={filter.name}
          btnState={selectedFilter === filter.name ? "activeMain" : "whiteMain"}
          text={filter.name}
          icon=""
          btnSize="filterSize"
          onClick={() => handleFilterChange(filter.name)}
        ></Buttons>
      ))}
    </ContentSlider>
  );
};

export default Filters;
