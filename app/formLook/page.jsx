"use client";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { Buttons } from "@/components/buttons/Buttons";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FormLook = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isFirstButtonVisible, setIsFirstButtonVisible] = useState(false);
  const [isSecondButtonVisible, setIsSecondButtonVisible] = useState(false);
  const [checkboxOptions, setCheckboxOptions] = useState([
    { value: "Casual", label: "Casual" },
    { value: "Citadino", label: "Citadino" },
    { value: "Premium", label: "Premium" },
    { value: "Formal", label: "Formal" },
    { value: "Alternativo", label: "Alternativo" },
  ]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = (id) => {
    if (id === "first") {
      setIsFirstButtonVisible(!isFirstButtonVisible);
      setIsSecondButtonVisible(false);
    } else if (id === "second") {
      setIsSecondButtonVisible(!isSecondButtonVisible);
      setIsFirstButtonVisible(false);
    }
  };

  const handleCheckboxToggle = (option) => {
    const updatedOptions = [...selectedOptions];
    const index = updatedOptions.findIndex(
      (selected) => selected.value === option.value
    );

    if (index === -1) {
      updatedOptions.push(option);
    } else {
      updatedOptions.splice(index, 1);
    }

    setSelectedOptions(updatedOptions);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSelectedOptions([]);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    if (term === "") {
      setCheckboxOptions([
        { value: "Casual", label: "Casual" },
        { value: "Citadino", label: "Citadino" },
        { value: "Premium", label: "Premium" },
        { value: "Formal", label: "Formal" },
        { value: "Alternativo", label: "Alternativo" },
      ]);
    } else {
      const filtered = checkboxOptions.filter((option) =>
        option.label.toLowerCase().includes(term)
      );
      setCheckboxOptions(filtered);
    }
  };
  return (
    <>
      <NavigationTitle titleText="Submissão de look" />
      <form className="container mx-auto overflow-hidden mb-6">
        <div className="text-center justify-center items-center">
          <label className="block text-secondary font-inter mb-2 h-64 border">
            {selectedImage ? (
              <div className="mt-12 w-auto h-auto flex flex-col items-center">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  width={48}
                  height={48}
                  className="h-40 w-40 object-cover  flex mx-auto"
                />
                <div className="flex justify-center mt-2 text-secondary">
                  <input
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <p>Alterar foto</p>
                </div>
              </div>
            ) : (
              <div className="mt-32 justify-center bg-text-secondary ">
                <p>Adiciona Imagem Aqui </p>
                <input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <AddPhotoAlternateIcon className="rotate-90" htmlFor="image" />
              </div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <div className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mt-6">
            <div
              id="firstClick"
              className="flex text-secondary-700"
              onClick={() => handleDivClick("first")}
            >
              <label className="block font-inter text-secondary mb-2 ">
                Peças Usadas*
              </label>
              <ArrowDropDownIcon
                className={
                  isFirstButtonVisible
                    ? "ml-auto rotate-180 text-secondary"
                    : "ml-auto text-secondary"
                }
              />
            </div>
            {isFirstButtonVisible && (
              <>
                <div className="flex justify-between search-temp w-full px-4 py-4 bg-white relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-10">
                    <SearchIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="pl-16 w-full h-20 border rounded "
                    placeholder="Pesquisa"
                  />
                </div>

                <div className="mt-2"></div>
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mt-6">
            <div
              id="secondClick"
              className="flex text-secondary-700"
              onClick={() => handleDivClick("second")}
            >
              <label className="block font-inter text-secondary mb-2 ">
                Estilo*
              </label>
              <ArrowDropDownIcon
                className={
                  isSecondButtonVisible
                    ? "ml-auto rotate-180 text-secondary"
                    : "ml-auto text-secondary"
                }
              />
            </div>
            {isSecondButtonVisible && (
              <>
                <div className="flex justify-between search-temp w-full px-4 py-4 bg-white relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-10">
                    <SearchIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="pl-16 w-full h-20 border rounded "
                    placeholder="Pesquisa"
                    onChange={handleSearch}
                  />
                </div>
                <div className="block ">
                  {checkboxOptions.map((option) => (
                    <div key={option.value} className="flex">
                      <input
                        type="checkbox"
                        id={option.value}
                        value={option.value}
                        checked={selectedOptions.some(
                          (selected) => selected.value === option.value
                        )}
                        onChange={() => handleCheckboxToggle(option)}
                        className="w-8 h-8 m-4 justify-center checkbox-css"
                      />
                      <label htmlFor={option.value} className="ml-6 py-5">
                        {option.label}
                      </label>
                    </div>
                  ))}
                  <div className="mt-6" onClick={handleReset}>
                    <Buttons
                      type="button"
                      btnState="secondaryMain"
                      icon="redifine"
                      text="Redefinir"
                      btnSize="mediumSizeSocials"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mt-6">
            <div className="flex text-secondary">
              <input
                className=" w-full py-2  text-secondary leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Link de foto no Instagram"
              />
            </div>
          </div>
        </div>
        <div className="mt-6" onClick={handleReset}>
          <Buttons
            btnState="disabledMain"
            text="Submeter"
            btnSize="mediumSizeSocials"
          />
        </div>
      </form>
    </>
  );
};
export default FormLook;
