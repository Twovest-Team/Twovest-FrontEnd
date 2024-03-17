import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Dropdownalloffers({ label }) {
  return (
    <div className="w-full flex shadow border rounded py-4 px-4 text-secondary-700 text-secondary">
      <label className="font-inter ">{label}</label>
      <ArrowDropDownIcon className="ml-auto" />
    </div>
  );
}
