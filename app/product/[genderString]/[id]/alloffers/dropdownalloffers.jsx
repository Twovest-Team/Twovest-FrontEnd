import React, { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Dropdownalloffers({ label, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownLabel, setDropdownLabel] = useState(label);

  useEffect(() => {
    if (selectedOption !== null) {
      setDropdownLabel(selectedOption);
    } else {
      setDropdownLabel(label);
    }
  }, [selectedOption, label]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!setIsOpen) {
      selectedOption(null);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">
      <div
        className="w-full flex shadow border rounded py-4 px-4 text-secondary-700 text-secondary cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="font-inter">{dropdownLabel}</span>{" "}
        {/* Utilizando dropdownLabel em vez de label */}
        <ArrowDropDownIcon className="ml-auto" />
      </div>
      {isOpen && (
        <div className="absolute top-full z-10 mt-1 w-full bg-white shadow-md rounded border border-gray-200">
          {Array.isArray(options) &&
            options.map((option, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  option === setSelectedOption ? "bg-gray-100" : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                <span className="text-gray-800">{option}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
