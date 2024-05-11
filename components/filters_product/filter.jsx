"use client";
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Switch } from "@headlessui/react";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, InputAdornment, Input } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getBrands from "@/utils/db/getProductById";
function Filter({}) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [materials, setMaterials] = useState("");
  const [rating, setRating] = useState(0);
  const [isSustainable, setIsSustainable] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    isNew: false,
    isOld: false,
    isVeryOld: false,
  });

  const initialColors = {
    Vermelho: false,
    Azul: false,
    Verde: false,
    Laranja: false,
    Amarelo: false,
    Roxo: false,
    Rosa: false,
    Cinza: false,
    Preto: false,
    Branco: false,
    Castanho: false,
    Bege: false,
    Ocre: false,
    Turquesa: false,
    Dourado: false,
    Prateado: false,
    Mix: false,
  };

  const [selectedColors, setSelectedColors] = useState(initialColors);
  const initialBrands = {
    Adidas: false,
    Nike: false,
    LeviStraussCo: false,
    HAndM: false,
    Zara: false,
    Gap: false,
    RalphLauren: false,
    CalvinKlein: false,
    TommyHilfiger: false,
    TheNorthFace: false,
    Columbia: false,
    Timberland: false,
    Patagonia: false,
    UnderArmour: false,
    Lululemon: false,
    Burberry: false,
    Prada: false,
  };
  const [selectedMaterials, setSelectedMaterials] = useState(initialColors);
  const initialMaterials = {
    Adidas: false,
    Nike: false,
    LeviStraussCo: false,
    HAndM: false,
    Zara: false,
    Gap: false,
    RalphLauren: false,
    CalvinKlein: false,
    TommyHilfiger: false,
    TheNorthFace: false,
    Columbia: false,
    Timberland: false,
    Patagonia: false,
    UnderArmour: false,
    Lululemon: false,
    Burberry: false,
    Prada: false,
  };

  const [selectedBrands, setSelectedBrands] = useState(initialBrands);
  const [colorSearch, setColorSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedShoeSize, setSelectedShoeSize] = useState("");
  const [selectedPantsSize, setSelectedPantsSize] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newValue = Math.min(Math.max(parseInt(value, 10), 0), 1000);
    setPriceRange((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleDecrement = (field) => {
    setPriceRange((prev) => ({
      ...prev,
      [field]: Math.min(prev[field] + 1, 1000),
    }));
  };

  const handleIncrement = (field) => {
    setPriceRange((prev) => ({
      ...prev,
      [field]: Math.max(prev[field] - 1, 0),
    }));
  };
  const handleBrandChange = (event) => {
    setBrandSearch(event.target.value);
  };

  const handleColorChange = (event) => {
    setColorSearch(event.target.value);
  };

  const handleCheckboxChange = (checkbox, color, brands) => {
    if (color) {
      setSelectedColors((prevState) => ({
        ...prevState,
        [color]: !prevState[color],
      }));
    } else if (brands) {
      setSelectedBrands((prevBrands) => ({
        ...prevBrands,
        [brands]: !prevBrands[brands],
      }));
    } else {
      setCheckboxState((prevState) => ({
        ...prevState,
        [checkbox]: !prevState[checkbox],
      }));
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize((prevSize) => (prevSize === size ? "" : size));
  };

  const handleShoeSizeClick = (size) => {
    setSelectedShoeSize((prevSize) => (prevSize === size ? "" : size));
  };

  const handlePantsSizeClick = (size) => {
    setSelectedPantsSize((prevSize) => (prevSize === size ? "" : size));
  };

  const handleReset = (resetType) => {
    switch (resetType) {
      case "size":
        setSelectedSize("");
        setSelectedShoeSize("");
        setSelectedPantsSize("");
        break;
      case "colors":
        setSelectedColors((prevState) => {
          const updatedColors = {};
          Object.keys(prevState).forEach((color) => {
            updatedColors[color] = false;
          });
          return updatedColors;
        });
        break;
      case "brands":
        setSelectedBrands((prevState) => {
          const updatedBrands = {};
          Object.keys(prevState).forEach((brands) => {
            updatedBrands[brands] = false;
          });
          return updatedBrands;
        });

        break;
      default:
        break;
    }
  };
  const handleResetAll = () => {
    setSelectedCategory("");
    setBrand("");
    setRating(0);
    setIsSustainable(false);
    setIsPromotion(false);
    setCheckboxState({
      isNew: false,
      isOld: false,
      isVeryOld: false,
    });
    setSelectedColors(initialColors);
    setSelectedBrands(initialBrands);
    setColorSearch("");
    setBrandSearch("");
    setSelectedSize("");
    setSelectedShoeSize("");
    setSelectedPantsSize("");
    setSearchTerm("");
    setFilteredItems([]);
    setPriceRange({ min: 0, max: 1000 });
  };

  const filteredColors = Object.keys(initialColors).filter((color) =>
    color.toLowerCase().includes(colorSearch.toLowerCase())
  );

  const filteredBrands = Object.keys(initialBrands).filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );
  return (
    <div className="p-4 bg-white shadow-md  mb-4">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="border rounded">
              <Disclosure.Button className="w-full text-left flex justify-between items-center  px-6 py-4 text-base  sm:text-sm   ">
                Preço (€)
                <span className="transform transition-transform duration-200">
                  {open ? "▲" : "▼"}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="py-4 px-6 bg-white ">
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <label
                      htmlFor="minPrice"
                      className="block text-sm font-medium text-gray-700 "
                    >
                      Preço Mínimo
                    </label>
                    <Input
                      id="minPrice"
                      name="min"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 border"
                      value={priceRange.min}
                      onChange={handlePriceChange}
                      inputProps={{
                        min: 0,
                        max: 1000,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={() => handleIncrement("min")}>
                            <ExpandMoreIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDecrement("min")}>
                            <ExpandLessIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="maxPrice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Preço Máximo
                    </label>
                    <input
                      type="number"
                      id="maxPrice"
                      name="max"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300  border"
                      value={priceRange.max}
                      onChange={handlePriceChange}
                      min={priceRange.min}
                      max={priceRange.max}
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>

      <div className="mt-4">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="border rounded">
                <Disclosure.Button className="w-full text-left flex justify-between items-center px-6 py-4 text-base sm:text-sm">
                  Sustentabilidade
                  <span className="transform transition-transform duration-200">
                    {open ? "▲" : "▼"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="py-4 px-6 bg-white flex">
                  <label
                    htmlFor="sustainableFilter"
                    className="text-sm font-medium text-gray-700 mr-4"
                  >
                    Filtrar por artigos sustentáveis
                  </label>
                  <div className="flex flex-auto justify-end items-center">
                    <Switch
                      checked={isSustainable}
                      onChange={setIsSustainable}
                      className={`${
                        isSustainable ? "bg-primary_main" : "bg-slate-400"
                      } inline-block h-6 w-10 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${
                          isSustainable ? "translate-x-full" : "translate-x-1"
                        } flex h-4 w-4 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      </div>

      <div className="mt-4 ">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="border rounded">
                <Disclosure.Button className="w-full text-left flex justify-between items-center px-6 py-4 text-base sm:text-sm">
                  Condição
                  <span className="transform transition-transform duration-200">
                    {open ? "▲" : "▼"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="py-4 px-6 bg-white">
                  <div>
                    <div className="flex items-center">
                      <Switch
                        checked={checkboxState.isNew}
                        onChange={() =>
                          handleCheckboxChange("isNew", null, null)
                        }
                        className={`relative inline-flex items-center justify-center flex-shrink-0 h-6 w-6 cursor-pointer rounded border-2 border-gray-300 transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ${
                          checkboxState.isNew ? "bg-green-500" : "bg-white"
                        }`}
                      />
                      <label
                        htmlFor="isNew"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Novo
                      </label>
                      <div className="w-14 h-8  mx-4 align-middle rounded-full border bg-slate-400 text-sm flex justify-center items-center">
                        <p className="m-0 text-white">3200</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <Switch
                        checked={checkboxState.isOld}
                        onChange={() =>
                          handleCheckboxChange("isOld", null, null)
                        }
                        className={`relative inline-flex items-center justify-center flex-shrink-0 h-6 w-6 cursor-pointer rounded border-2 border-gray-300 transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ${
                          checkboxState.isOld ? "bg-green-500" : "bg-white"
                        }`}
                      />
                      <label
                        htmlFor="isOld"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Usado
                      </label>
                      <div className="w-14 h-8  mx-4 align-middle rounded-full border bg-slate-400 text-sm flex justify-center items-center">
                        <p className="m-0 text-white">3200</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <Switch
                        checked={checkboxState.isVeryOld}
                        onChange={() =>
                          handleCheckboxChange("isVeryOld", null, null)
                        }
                        className={`relative inline-flex items-center justify-center flex-shrink-0 h-6 w-6 cursor-pointer rounded border-2 border-gray-300 transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ${
                          checkboxState.isVeryOld ? "bg-green-500" : "bg-white"
                        }`}
                      />

                      <label
                        htmlFor="isVeryOld"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Muito Usado
                      </label>
                      <div className="w-14 h-8  mx-4 align-middle rounded-full border bg-slate-400 text-sm flex justify-center items-center">
                        <p className="m-0 text-white">3200</p>
                      </div>
                    </div>
                  </div>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      </div>
      <div className="mt-4">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="border rounded">
                <Disclosure.Button className="w-full text-left flex justify-between items-center px-6 py-4 text-base sm:text-sm">
                  Promoção
                  <span className="transform transition-transform duration-200">
                    {open ? "▲" : "▼"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="py-4 px-6 bg-white flex">
                  <label
                    htmlFor="promotionFilter"
                    className="text-sm font-medium text-gray-700 mr-4"
                  >
                    Filtrar por artigos em promoção
                  </label>
                  <div className="flex flex-auto justify-end items-center">
                    <Switch
                      checked={isPromotion}
                      onChange={setIsPromotion}
                      className={`${
                        isPromotion ? "bg-primary_main" : "bg-slate-400"
                      } inline-block h-6 w-10 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${
                          isPromotion ? "translate-x-full" : "translate-x-1"
                        } flex h-4 w-4 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      </div>
      <div className="mt-4 ">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="border rounded">
                <Disclosure.Button className="w-full text-left flex justify-between items-center px-6 py-4 text-base sm:text-sm">
                  Tamanho
                  <span className="transform transition-transform duration-200">
                    {open ? "▲" : "▼"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="py-4 px-6 bg-white flex flex-col">
                  <div className="flex items-center mb-4">
                    <label
                      htmlFor="Internacional"
                      className="text-sm font-medium text-gray-700 mr-4"
                    >
                      Internacional
                    </label>
                  </div>
                  <div className="flex flex-col">
                    {[
                      ["XS", "S", "M", "L", "XL"],
                      ["XXL", "3XL", "4XL", "5XL", "6XL"],
                      ["7XL", "8XL", "9XL", "10XL", "11XL"],
                    ].map((row, rowIndex) => (
                      <div key={rowIndex} className="flex flex-wrap">
                        {row.map((size, index) => (
                          <div
                            key={index}
                            className={`cursor-pointer border border-black px-4 py-2 m-2 ${
                              selectedSize === size
                                ? "bg-primary_main text-white"
                                : " bg-white"
                            }`}
                            onClick={() => handleSizeClick(size)}
                          >
                            {size}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center mt-4 mb-4">
                    <label
                      htmlFor="Internacional"
                      className="text-sm font-medium text-gray-700 mr-4"
                    >
                      Sapatos
                    </label>
                  </div>
                  <div className="flex flex-col">
                    {[
                      ["34", "35", "36", "37", "38"],
                      ["39", "40", "41", "42", "43"],
                      ["44", "45", "46", "47", "48"],
                    ].map((row, rowIndex) => (
                      <div key={rowIndex} className="flex flex-wrap">
                        {row.map((size, index) => (
                          <div
                            key={index}
                            className={`cursor-pointer border border-black px-4 py-2 m-2 ${
                              selectedShoeSize === size
                                ? "bg-primary_main text-white"
                                : " bg-white"
                            }`}
                            onClick={() => handleShoeSizeClick(size)}
                          >
                            {size}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-4 mb-4">
                    <label
                      htmlFor="Internacional"
                      className="text-sm font-medium text-gray-700 mr-4"
                    >
                      Calças
                    </label>
                  </div>
                  <div className="flex flex-col">
                    {[
                      ["25", "26", "27", "28", "29"],
                      ["30", "31", "32", "33", "34"],
                      ["35", "36", "37", "38", "39"],
                    ].map((row, rowIndex) => (
                      <div key={rowIndex} className="flex flex-wrap">
                        {row.map((size, index) => (
                          <div
                            key={index}
                            className={`cursor-pointer border border-black px-4 py-2 m-2 ${
                              selectedPantsSize === size
                                ? "bg-primary_main text-white"
                                : " bg-white"
                            }`}
                            onClick={() => handlePantsSizeClick(size)}
                          >
                            {size}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <button
                    className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleReset("size")}
                  >
                    <RefreshIcon className="mr-2" />
                    Redefinir
                  </button>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      </div>
      <div className="mt-4">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="border rounded">
                <Disclosure.Button className="w-full text-left flex justify-between items-center px-6 py-4 text-base sm:text-sm">
                  Cor
                  <span className="transform transition-transform duration-200">
                    {open ? "▲" : "▼"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="py-4 px-6 bg-white flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="relative w-full">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        value={colorSearch}
                        onChange={handleColorChange}
                        placeholder="Procurar..."
                        className="border rounded pl-10 w-full h-14 px-2 py-1"
                      />
                    </div>
                  </div>

                  {filteredColors.map((color, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <Switch
                        checked={selectedColors[color]}
                        onChange={() => handleCheckboxChange(null, color, null)}
                        className={`relative inline-flex items-center justify-center flex-shrink-0 h-6 w-6 cursor-pointer rounded border-2 border-gray-300 transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ${
                          selectedColors[color] ? "bg-green-500" : "bg-white"
                        }`}
                      />
                      <label
                        htmlFor={color}
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        {color}
                      </label>

                      <div className="w-14 h-8 mx-4 align-middle rounded-full border bg-slate-400 text-sm flex justify-center items-center">
                        <p className="m-0 text-white">3200</p>
                      </div>
                    </div>
                  ))}
                  <button
                    className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleReset("colors")}
                  >
                    <RefreshIcon className="mr-2" />
                    Redefinir
                  </button>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      </div>
      <div className="mt-4">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="border rounded">
                <Disclosure.Button className="w-full text-left flex justify-between items-center px-6 py-4 text-base sm:text-sm">
                  Marcas
                  <span className="transform transition-transform duration-200">
                    {open ? "▲" : "▼"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="py-4 px-6 bg-white flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="relative w-full">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        value={brandSearch}
                        onChange={handleBrandChange}
                        placeholder="Procurar..."
                        className="border rounded pl-10 w-full h-14 px-2 py-1"
                      />
                    </div>
                  </div>
                  {filteredBrands.map((brands, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <Switch
                        checked={selectedBrands[brands]}
                        onChange={() =>
                          handleCheckboxChange(null, null, brands)
                        }
                        className={`relative inline-flex items-center justify-center flex-shrink-0 h-6 w-6 cursor-pointer rounded border-2 border-gray-300 transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ${
                          selectedBrands[brands] ? "bg-green-500" : "bg-white"
                        }`}
                      />
                      <label
                        htmlFor={brands}
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        {brands}
                      </label>

                      <div className="w-14 h-8 mx-4 align-middle rounded-full border bg-slate-400 text-sm flex justify-center items-center">
                        <p className="m-0 text-white">3200</p>
                      </div>
                    </div>
                  ))}

                  <button
                    className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleReset("brands")}
                  >
                    <RefreshIcon className="mr-2" />
                    Redefinir
                  </button>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      </div>
      <div className="mt-4">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="border rounded">
                <Disclosure.Button className="w-full text-left flex justify-between items-center px-6 py-4 text-base sm:text-sm">
                  Material
                  <span className="transform transition-transform duration-200">
                    {open ? "▲" : "▼"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="py-4 px-6 bg-white flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="relative w-full">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        value={brandSearch}
                        onChange={handleBrandChange}
                        placeholder="Procurar..."
                        className="border rounded pl-10 w-full h-14 px-2 py-1"
                      />
                    </div>
                  </div>
                  {filteredBrands.map((brands, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <Switch
                        checked={selectedMaterials[materials]}
                        onChange={() =>
                          handleCheckboxChange(null, null, brands)
                        }
                        className={`relative inline-flex items-center justify-center flex-shrink-0 h-6 w-6 cursor-pointer rounded border-2 border-gray-300 transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ${
                          selectedBrands[brands] ? "bg-green-500" : "bg-white"
                        }`}
                      />
                      <label
                        htmlFor={brands}
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        {brands}
                      </label>

                      <div className="w-14 h-8 mx-4 align-middle rounded-full border bg-slate-400 text-sm flex justify-center items-center">
                        <p className="m-0 text-white">3200</p>
                      </div>
                    </div>
                  ))}

                  <button
                    className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleReset("brands")}
                  >
                    <RefreshIcon className="mr-2" />
                    Redefinir
                  </button>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      </div>
      <button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4">
        Aplicar
      </button>
      <button
        className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => handleResetAll()}
      >
        <RefreshIcon className="mr-2" />
        Reset
      </button>
    </div>
  );
}

export default Filter;
