"use client";

import logo from "../../public/images/logo_twovest_black.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

//import de icons materialUI
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartToggle";
import getUserData from "@/utils/db/getUserByEmail";
import { changeUserData } from "@/redux/slices/userSlice";
import { toggleMenu } from "@/redux/slices/menuToggle";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import NotificationCart from "../items/NotificationCart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Buttons } from "../buttons/Buttons";
export const Navbar = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const currentUser = useAppSelector((state) => state.user.data);
  const supabase = createClientComponentClient();

  const handleClickMenu = () => {
    dispatch(toggleMenu());
  };

  const handleClickCart = () => {
    dispatch(toggleCart());
  };
  const handleLoginRouter = () => {
    router.push("/login");
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();

    dispatch(changeUserData(null));
  };

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser) {
        let userData = await getUserData();
        dispatch(changeUserData(userData));
      }
    }

    fetchUserData();
  }, [currentUser, dispatch]);
  11;
  if (pathName != "/landing") {
    return (
      <nav className="flex justify-between items-center z-30 w-full fixed top-0 px-6 py-3 lg:py-5 bg-white border-b border-gray-200">
        <div className="flex desktopNavRight ">
          <Buttons
            ariaLabel="Localização da navbar"
            icon="menuIcon"
            btnSize="newIconSet2"
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
        <div className="flex desktopNavLeft justify-between items-center ">
          <Buttons
            ariaLabel="Ir para a Lista de artigos favoritos"
            icon="favorite2Navbar"
            btnSize="newIconSet4"
          />

          <Buttons
            ariaLabel="Ir para cesto de compras"
            icon="localBag"
            btnSize="newIconSet4"
            onClick={handleClickCart}
          />

          <NotificationCart />

          <Menu>
            {currentUser ? (
              <Menu.Button>
                <div className="w-6 h-6 ml-3 mr-4 flex rounded-full border border-gray-300 overflow-hidden">
                  <img
                    src={currentUser.img}
                    className="w-fit h-fit object-cover"
                    alt="profile image"
                  />
                </div>
              </Menu.Button>
            ) : (
              <Menu.Button>
                <div className="navbar_icons">
                  <AccountCircleOutlinedIcon />
                </div>
              </Menu.Button>
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
                          className={`${
                            active && "bg-grey_opacity_50"
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
                            className={`${
                              active && "bg-grey_opacity_50"
                            } text-error_main  caption`}
                          >
                            Sair -&gt;
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  </>
                ) : (
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
                          className={`${
                            active && "bg-grey_opacity_50"
                          } cursor-pointer`}
                        >
                          <div className="bg-primary_main p-2 text-white block text-center text-[13.33px] font-semibold  rounded">
                            Iniciar sessão
                          </div>
                        </Link>
                      </div>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </Menu>

          {!currentUser && (
            <Buttons
              btnState="blackMain"
              text="Login | Registo"
              btnSize="navBarButton"
              onClick={handleLoginRouter}
            />
          )}
        </div>

        {children}
      </nav>
    );
  }
};
