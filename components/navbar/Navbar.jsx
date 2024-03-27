"use client";

import logo from "../../public/images/logo_twovest_black.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAppDispatch } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartToggle";
import { changeUserData } from "@/redux/slices/userSlice";
import { toggleMenu } from "@/redux/slices/menuToggle";
import { Menu, Transition } from "@headlessui/react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import NotificationCart from "../items/NotificationCart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useAuth from "@/hooks/client-hooks/useAuth";
import useWindow from "@/hooks/client-hooks/useWindow";
import Button from "../buttons/Button";
import IconButton from "../buttons/icons/IconButton";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = ({ children }) => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const { currentUser, userChecked, setUserChecked } = useAuth();
  const supabase = createClientComponentClient();
  const { isMobile } = useWindow();
  const handleClickMenu = () => dispatch(toggleMenu());

  const handleClickCart = () => dispatch(toggleCart());

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(changeUserData(null));
    setUserChecked(false);
    console.log("Logged out. userChecked:", userChecked);
  };

  if (pathName === "/landing") {
    return null;
  }

  return (
    <nav className="z-30 w-full fixed top-0 bg-white border-b border-gray-200 h-[75px]">
      <div className="container flex justify-between items-center h-full">
        {/* NAVBAR LEFT SECTION */}
        <div className="flex gap-4">
          <IconButton
            ariaLabel={"Abrir menu de navegação."}
            icon={<MenuIcon />}
            onClick={handleClickMenu}
          />

          <Link href={"/"} className="items-center flex">
            <Image
              src={logo}
              width={105}
              height={24}
              alt="Logo Twovest"
              className="navbar_logo-xs"
            ></Image>

            <Image
              src={logo}
              width={130}
              height={24}
              alt="Logo Twovest"
              className="navbar_logo-sm"
            ></Image>
          </Link>
        </div>

        {/* NAVBAR RIGHT SECTION */}
        <div className="flex justify-between items-center ">
          <div className="flex items-center mr-3">
            <IconButton icon={<SearchIcon />} />
            <IconButton icon={<FavoriteBorderOutlinedIcon />} />
            <div className="relative">
              <IconButton
                icon={<LocalMallOutlinedIcon />}
                onClick={handleClickCart}
              />
              <div className="cursor-pointer" onClick={handleClickCart}>
                {currentUser && <NotificationCart currentUser={currentUser} />}
              </div>
            </div>
          </div>

          <Menu>
            {currentUser ? (
              <Menu.Button>
                <div className="flex w-8 h-8 ml-2 aspect-square rounded-full border border-gray-300 relative">
                  <Image
                    src={currentUser.img}
                    className="w-10 h-10 rounded-full"
                    alt="Imagem de perfil"
                    fill={true}
                  ></Image>
                </div>
              </Menu.Button>
            ) : (
              isMobile && (
                <Menu.Button>
                  <AccountCircleOutlinedIcon />
                </Menu.Button>
              )
            )}
            {!isMobile && userChecked == false && (
              <Button
                height="11"
                href="/login"
                type={"black"}
                ariaLabel="Fazer login ou registo"
                width="fit"
              >
                <span> Login | Registar</span>
              </Button>
            )}
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items
                className={
                  "absolute flex-wrap bg-white mt-12 px-6 py-4 w-[220px] right-1 shadow rounded"
                }
              >
                {currentUser ? (
                  <>
                    <Menu.Item className="mb-2 w-full">
                      {({ active, close }) => (
                        <div
                          className={`${active && "bg-grey_opacity_50"
                            } font-semibold`}
                        >
                          <div>
                            <div>
                              <Link
                                href={`/profile/${currentUser.id}`}
                                onClick={close}
                                className="truncate"
                              >
                                {currentUser.name}
                              </Link>
                            </div>
                          </div>
                          <div className="bg-primary_main px-1 py-2 w-full h-[32px] text-center caption mt-2 text-white rounded">
                            ID: {currentUser.id}
                          </div>
                        </div>
                      )}
                    </Menu.Item>

                    <div className="border-b border-grey my-4"></div>

                    <Menu.Item>
                      {({ active, close }) => (
                        <div className={"w-full start-0"}>
                          <Link
                            href={`/profile/${currentUser.id}`}
                            onClick={close}
                            className={`${active && "bg-grey_opacity_50"}`}
                          >
                            <div className="mb-3 caption text-start">
                              Perfil
                            </div>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active, close }) => (
                        <div>
                          <Link
                            href={"/"}
                            onClick={close}
                            className={`${active && "bg-grey_opacity_50"}`}
                          >
                            <div className="caption items-center flex">
                              <AutoModeIcon className=" h-5 w-5 mr-1.5" />
                              <div>Pontos&Cupões</div>
                            </div>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>

                    <div className="border-b border-grey my-4"></div>

                    <Menu.Item>
                      {({ active, close }) => (
                        <div>
                          <Link
                            href={"/submitLook"}
                            onClick={close}
                            className={`${active && "bg-grey_opacity_50"}`}
                          >
                            <div className="mb-3 caption items-center flex">
                              <ArrowCircleUpIcon className="h-5 w-5 mr-1.5" />
                              <div>Submeter novo look</div>
                            </div>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active, close }) => (
                        <div>
                          <Link
                            href={`/profile?${currentUser.id}`}
                            onClick={close}
                            className={`${active && "bg-grey_opacity_50"}`}
                          >
                            <div className="mb-3 caption">Gerir meus looks</div>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active, close }) => (
                        <div>
                          <Link
                            href={`/profile?${currentUser.id}`}
                            onClick={close}
                            className={`${active && "bg-grey_opacity_50"}`}
                          >
                            <div className="caption">Ver coleções de looks</div>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>

                    <div className="border-b border-grey my-4"></div>

                    <Menu.Item>
                      {({ active, close }) => (
                        <div>
                          <Link
                            href={`/profile?${currentUser.id}`}
                            onClick={close}
                            className={`${active && "bg-grey_opacity_50"}`}
                          >
                            <div className="mb-3 caption">
                              Histórico de compras
                            </div>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active, close }) => (
                        <div>
                          <Link
                            href={`/profile?${currentUser.id}`}
                            onClick={close}
                            className={`${active && "bg-grey_opacity_50"}`}
                          >
                            <div className="mb-3 caption">
                              Definições de conta
                            </div>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active, close }) => (
                        <div
                          className={"w-full text-start cursor-pointer"}
                          onClick={handleLogout}
                        >
                          <div
                            className={`${active && "bg-grey_opacity_50"
                              } text-error_main  caption`}
                          >
                            Sair -&gt;
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  isMobile && (
                    <Menu.Item>
                      {({ active, close }) => (
                        <div className="px-2 py-4">
                          <div className="mb-3 font-semibold">
                            Inicia sessão para poderes aceder às definições de
                            conta
                          </div>
                          <Link
                            href={"/login"}
                            onClick={close}
                            className={`${active && "bg-grey_opacity_50"
                              } cursor-pointer`}
                          >
                            <div className="bg-primary_main p-2 text-white block text-center text-[13.33px] font-semibold  rounded">
                              Iniciar sessão
                            </div>
                          </Link>
                        </div>
                      )}
                    </Menu.Item>
                  )
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {children}
      </div>
    </nav>
  );
};
