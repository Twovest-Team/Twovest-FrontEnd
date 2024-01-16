"use client";

import getAllStyles from "@/utils/db/getAllStyles";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Filters = ({gender}) => {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
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
    setSelectedFilter(style);

    router.push(`/gallery/${gender}?style=${style}`);
  };

  return (
    <div className="filters">
      <button
        key="all"
        className={`filter-button ${
          "Todos" === selectedFilter ? "active" : ""
        }`}
        onClick={() => handleFilterChange("Todos")}
      >
        Todos
      </button>
      {styles.map((filter) => (
        <button
          key={filter.id}
          className={`filter-button ${
            filter.name === selectedFilter ? "active" : ""
          }`}
          onClick={() => handleFilterChange(filter.name)}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default Filters;
