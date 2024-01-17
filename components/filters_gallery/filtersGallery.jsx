"use client";

import getAllStyles from "@/utils/db/getAllStyles";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ContentSlider from "../sliders/ContentSlider";

const Filters = ({style, gender}) => {
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
    if(style){
      setSelectedFilter(style);
      router.push(`/gallery/${gender}?style=${style}`);
    }else{
      setSelectedFilter()
      router.push(`/gallery/${gender}`);
    }

    
  };

  return (
    <ContentSlider>
      <button
        key="all"
        className={`filter-button ${
          !selectedFilter && "active"
        }`}
        onClick={() => handleFilterChange()}
      >
        Todos
      </button>
      {styles.map((filter) => (
        <button
          key={filter.id}
          className={`filter-button ${
            selectedFilter && selectedFilter === filter.name && "active"
          }`}
          onClick={() => handleFilterChange(filter.name)}
        >
          {filter.name}
        </button>
      ))}
    </ContentSlider>
  );
};

export default Filters;
