"use client";

import { PrimaryMenuPagesList } from "./PrimaryMenuPages";
import { SecondaryMenuPagesList } from "./SecondaryMenuPages";
import { SocialMediaLogos_black } from "../logos/SocialMediaLogos_black";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SellIcon from "@mui/icons-material/Sell";
import StarsIcon from "@mui/icons-material/Stars";
import { general_categories } from "@/constants";
import LanguageButton from "../buttons/LanguageButton";
import Image from "next/image";
import { CategoriesMenu } from "./CategoriesMenu";
import SustainableButton from "../buttons/icons/SustainableButton";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { toggleMenu } from "@/redux/slices/menuToggle";
import SearchIcon from "@mui/icons-material/Search";
import useGender from "@/hooks/client-hooks/useGender";
import useAuth from "@/hooks/client-hooks/useAuth";
import { genders } from "@/constants";
import refreshData from "@/utils/refreshData";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from "../buttons/Button";

export const SideMenu = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.menuToggle.isOpen);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [idCategory, setIdCategory] = useState(null);

  const { currentUser } = useAuth();
  const [gender, setGender] = useGender();

  if (!gender) return null;

  const handleClickCategory = (id) => {
    setCategoryOpen(!categoryOpen);
    setIdCategory(id);
  };

  const handleClickMenu = () => {
    dispatch(toggleMenu());
  };

  function handleGender(gender) {
    refreshData(gender.string);
    setGender(gender);
    dispatch(toggleMenu());
  }

  return (
    <>
      {/* ---- Menu categorias ---- */}
      <CategoriesMenu
        idCategory={idCategory}
        categoryOpen={categoryOpen}
        handleClickCategory={handleClickCategory}
        handleClickMenu={handleClickMenu}
      />

      {/* ------ Menu lateral -------*/}
      <div
        className={`${isMenuOpen ? "hidden" : "block"}
             bg-white h-full w-screen min-w-[280px] max-w-[460px] overflow-x-hidden overflow-y-scroll fixed top-0 left-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center border-b-grey border-b-2">
          <div className="flex my-5 mx-4">
            {genders.map((object) => (
              <button
                key={object.id}
                onClick={() => handleGender(object)}
                className={`${
                  gender.id != object.id
                    ? "text-secondary font-semibold mr-2"
                    : "text-black font-semibold mr-2"
                } `}
              >
                {object.stringPT}
              </button>
            ))}
          </div>
          <div className="flex mx-4">
            <div onClick={handleClickMenu} className="cursor-pointer">
              <CloseOutlinedIcon />
            </div>
          </div>
        </div>

        <div className="mx-4 my-4">
          {currentUser == null && (
            <Button
              href="/login"
              type="black"
              ariaLabel="Fazer login ou registo"
              justify="space-between"
              width="100%"
            >
                <span> Fazer login ou registo</span>
                <KeyboardArrowRightIcon
                  className="translate-x-2"
                  sx={{ fontSize: 28 }}
                />
            </Button>
          )}

          <div className="mt-3 relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Pesquisa"
              className="pl-14 pr-20 py-4 w-full rounded border border-grey focus:outline-none focus:border-black"
            />
          </div>
          {/* <input type="text" placeholder="Pesquisa" className="mt-3 px-4 py-4 w-full rounded border border-grey" /> */}

          <ul className="menu_categories mt-4">
            {general_categories.map((category) => (
              <li key={category.id}>
                <div
                  key={category.id}
                  className="bg-grey_opacity_50 p-4 cursor-pointer items-center rounded flex justify-between"
                  onClick={() => handleClickCategory(category.id)}
                >
                  <p>{category.name}</p>
                  <Image
                    src={category.img}
                    width={25}
                    height={25}
                    alt={category.name}
                  />
                </div>
              </li>
            ))}

            <li key={"SideMenu-Marcas"}>
              <Link
                onClick={handleClickMenu}
                href={"/brands"}
                className="bg-grey_opacity_50 p-4 cursor-pointer rounded flex justify-between"
              >
                <div>Marcas</div>
                <StarsIcon className="fill-black" alt="simbolo marcas" />
              </Link>
            </li>
            <li key={"SideMenu-Sustentavel"}>
              <Link
                href={`/products/${gender.string}?status=sustainable`}
                onClick={() => handleClickMenu()}
              >
                <div className="bg-primary_main text-white cursor-pointer items-center p-4 rounded flex justify-between">
                  Sustentável
                  <SustainableButton type="normal" width={28} color="white" />
                </div>
              </Link>
            </li>
            <li key={"SideMenu-Promocoes"}>
              <Link
                href={`/products/${gender.string}?status=discounts`}
                onClick={() => handleClickMenu()}
              >
                <div className="bg-grey_opacity_50 cursor-pointer p-4 rounded flex justify-between">
                  Promoções
                  <SellIcon
                    className="fill-primary_main"
                    alt="simbolo Promoções"
                  />
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <PrimaryMenuPagesList toggleMenu={handleClickMenu} />

        <SecondaryMenuPagesList toggleMenu={handleClickMenu} />

        <div className="mx-4">
          <LanguageButton textColor="black" />
        </div>

        <SocialMediaLogos_black />
      </div>
    </>
  );
};
