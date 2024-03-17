"use client";

import { PrimaryMenuPagesList } from "./PrimaryMenuPages";
import { SecondaryMenuPagesList } from "./SecondaryMenuPages";
import { SocialMediaLogos_black } from "../logos/SocialMediaLogos_black";
import { Buttons } from "../buttons/Buttons";
import SellIcon from "@mui/icons-material/Sell";
import StarsIcon from "@mui/icons-material/Stars";
import { general_categories } from "@/constants";
import LanguageButton from "../buttons/LanguageButton";
import Image from "next/image";
import { CategoriesMenu } from "./CategoriesMenu";
import { SustainableIcon } from "../buttons/icons/SustainableIcon";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { toggleMenu } from "@/redux/slices/menuToggle";
import SearchIcon from "@mui/icons-material/Search";
import useGender from "@/hooks/useGender";
import useAuth from "@/hooks/useAuth";
import { genders } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import refreshData from "@/utils/refreshData";

export const SideMenu = () => {

  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.menuToggle.isOpen);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const router = useRouter()
  const pathname = usePathname()

  const currentUser = useAuth()
  const [gender, setGender] = useGender();

  if(!gender) return null

  const handleClickCategory = (id) => {
    setCategoryOpen(!categoryOpen);
    setIdCategory(id);
  };

  const handleClickMenu = () => {
    dispatch(toggleMenu());
  };

  function handleGender(gender){
    refreshData(gender.string)
    setGender(gender)
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
        className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full block"}
             bg-white z-30 overflow-scroll h-full w-screen min-w-[280px] max-w-[460px] fixed top-0 left-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center border-b-grey border-b-2">
          <div className="flex my-5 mx-4">

            {genders.map(object => (
              <button
                onClick={() => handleGender(object)}
                className={`${gender.id != object.id
                    ? "text-secondary font-semibold mr-2"
                    : "text-black font-semibold mr-2"
                  } `}
              >
                {object.stringPT}
              </button>
            ))}

          </div>
          <div className="flex mx-4">
            <Buttons
              ariaLabel="Fechar side Menu"
              btnState="none"
              text=""
              icon="closeOutline"
              btnSize="iconPack2"
              onClick={handleClickMenu}
            ></Buttons>
          </div>
        </div>

        <ul className="mx-4 my-4">
          {currentUser == null && (
            <Link href={"/login"} onClick={handleClickMenu}>
              <Buttons
                btnState="secondaryMain"
                text="Fazer log in ou registo"
                icon="navigateNext"
                btnSize="menuSize"
              />
            </Link>
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

          <div className="menu_categories mt-4">


            {general_categories.map(category => (
              <div
                key={category.id}
                className="bg-grey_opacity_50 p-4 cursor-pointer items-center rounded flex justify-between"
                onClick={() => handleClickCategory(category.id)}
              >
                <p>{category.name}</p>
                <Image src={category.img} width={25} height={25} alt={category.name} />
              </div>
            ))}



            <Link
              onClick={handleClickMenu}
              href={"/brands"}
              className="bg-grey_opacity_50 p-4 cursor-pointer rounded flex justify-between"
            >
              <div>Marcas</div>
              <StarsIcon className="fill-black" alt="simbolo marcas" />
            </Link>
            <Link
              href={`/products/${gender.string}?status=sustainable`}
              onClick={() => handleClickMenu()}
            >
              <div className="bg-primary_main text-white cursor-pointer items-center p-4 rounded flex justify-between">
                Sustentável
                <SustainableIcon width={25} color="white" />
              </div>
            </Link>
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
          </div>
        </ul>

        <PrimaryMenuPagesList toggleMenu={handleClickMenu}/>

        <SecondaryMenuPagesList toggleMenu={handleClickMenu} />

        <div className="mx-4">
          <LanguageButton textColor="black" />
        </div>

        <SocialMediaLogos_black />
      </div>
    </>
  );
};
