"use client";

import { PrimaryMenuPagesList } from "./PrimaryMenuPages";
import { SecondaryMenuPagesList } from "./SecondaryMenuPages";
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
import { useEffect, useState } from "react";
import { toggleMenu } from "@/redux/slices/menuToggle";
import SearchIcon from "@mui/icons-material/Search";
import useGender from "@/hooks/client-hooks/useGender";
import useAuth from "@/hooks/client-hooks/useAuth";
import { genders } from "@/constants";
import refreshData from "@/utils/refreshData";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from "../buttons/Button";
import IconButton from "@/components/buttons/icons/IconButton";
import FooterNavbar from "./FooterNavbar";

export const SideMenu = () => {
  const dispatch = useAppDispatch();

  const isMenuOpen = useAppSelector((state) => state.menuToggle.isOpen);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const [menuVisible, setMenuVisible] = useState(isMenuOpen);

  const { currentUser } = useAuth();
  const [gender, setGender] = useGender();

  useEffect(() => {
    if (isMenuOpen) {
      setMenuVisible(true);
    } else {
      setTimeout(() => setMenuVisible(false), 200); // Match the delay of the transition
    }
  }, [isMenuOpen]);

  if (!gender) return null;

  const handleClickCategory = (id) => {
    setCategoryOpen(!categoryOpen);
    setIdCategory(id);
  };

  const handleClickMenu = () => {
    dispatch(toggleMenu());
    setCategoryOpen(false);
  };

  function handleGender(gender) {
    refreshData(gender.string);
    setGender(gender);
    dispatch(toggleMenu());
  }

  return (
    <>
      <section
        className={`${isMenuOpen ? 'visible' : 'invisible'} bg-black backdrop-blur-sm bg-opacity-30 left-0 right-0 top-0 bottom-0 fixed h-full w-full z-[98]`}
        onClick={handleClickMenu}
      />

      <CategoriesMenu
        idCategory={idCategory}
        categoryOpen={categoryOpen}
        handleClickCategory={handleClickCategory}
        handleClickMenu={handleClickMenu}
      />

      <div
        className={`${menuVisible ? 'visible' : 'invisible'} ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
             bg-white h-[100vh] w-screen min-w-[280px] max-w-[448px] overflow-x-hidden overflow-y-auto scroll_bar-invisible fixed top-0 left-0 transition-all duration-500 delay-100 z-[99]`}
      >
        <div className="flex justify-between items-center border-b-grey border-b">
          <div className="flex gap-2 my-5 mx-4">
            {genders.map((object) => (
              <button
                key={object.id}
                onClick={() => handleGender(object)}
                className={`${gender.id != object.id ? "text-secondary font-semibold mr-2" : "text-black font-semibold mr-2"}`}
              >
                {object.stringPT}
              </button>
            ))}
          </div>
          <div className="flex mx-4">
            <IconButton
              ariaLabel="Fechar menu de navegação"
              icon={<CloseOutlinedIcon className="text-secondary" />}
              onClick={handleClickMenu}
            />
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
              <KeyboardArrowRightIcon className="translate-x-2" sx={{ fontSize: 28 }} />
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

          <ul className="menu_categories mt-4">
            {general_categories.map((category) => (
              <li key={category.id}>
                <div
                  className="bg-grey_opacity_50 hover:bg-grey hover:bg-opacity-50 transition-colors duration-100 p-4 cursor-pointer items-center rounded flex justify-between"
                  onClick={() => handleClickCategory(category.id)}
                >
                  <p>{category.name}</p>
                  <Image src={category.img} width={25} height={25} alt={category.name} />
                </div>
              </li>
            ))}

            <li key={"SideMenu-Marcas"}>
              <Link
                onClick={handleClickMenu}
                href={"/brands"}
                className="bg-grey_opacity_50 hover:bg-grey hover:bg-opacity-50 transition-colors duration-100 p-4 cursor-pointer rounded flex justify-between"
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
                <div className="bg-primary_main hover:bg-primary_dark transition-colors duration-100 text-white cursor-pointer items-center p-4 rounded flex justify-between">
                  Sustentável
                  <div className="pointer-events-none w-6 h-6">
                    <SustainableButton type="normal" width={26} color="white" />
                  </div>
                </div>
              </Link>
            </li>
            <li key={"SideMenu-Promocoes"}>
              <Link
                href={`/products/${gender.string}?status=discounts`}
                onClick={() => handleClickMenu()}
              >
                <div className="bg-grey_opacity_50 hover:bg-grey hover:bg-opacity-50 transition-colors duration-100 cursor-pointer p-4 rounded flex justify-between">
                  Promoções
                  <SellIcon className="fill-primary_main" alt="simbolo Promoções" />
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

        <FooterNavbar />
      </div>
    </>
  );
};
