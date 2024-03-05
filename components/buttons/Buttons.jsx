/*

Como usar
btnState = "defaultMain" 
  defaultMain: 'bg-primary_main hover:bg-primary_dark',  //verde normal, com over (default o mais usado)
    hoverMain: 'bg-primary_dark ',
    focusedMain: 'bg-primary_dark', 
    disabledMain: 'bg-grey_opacity_50',  //para botoes que vao ficar disabled 
    secondaryMain:'bg-dark hover:bg-dark_gray',  //botoes secundários
    errorMain:'bg-error_main hover:bg-error_dark',
    none:''
btnSize =  "menuSize"
//tipo de tamanhos 
modalSize: 'w-full h-14 gap-12 items-center',
    menuSize: 'w-full h-14 py-2 px-4 mt-4 flex gap-12 text-center justify-between items-center', //usado apenas no scroll menu
    mediumSize: 'w-full h-full px-8 flex py-3.5 mt-4 gap-12 items-center justify-between', // usado no geral em açoes como concluir, enviar, carregar mais, proximo passo etc
    mediumSizeSocials: 'w-full h-55 px-8 py-3.5 mt-4 flex justify-center items-center gap-3 text-center',  // Social netwowrks
    redefineSize: 'w-full h-55 px-3 py-9 mt-4 flex justify-center items-center gap-3 text-center',  //usado para voltar para a galeria e redefinir
    large: 'px-5 py-5  mt-4 text-lg', // caso pretendam um botao maior podem ajustar 
    justIcons:'w-[18px] ml-auto translate-x-1 justify-center items-center fontSize: 28'  

    text="o texto pretendido para o botao"
    icon="navigateNext"

    // Tipo de icons
     navigateNext: <NavigateNextIcon className='text-white'/>,
    cancel: <CancelIcon className='text-white ' />,
    add: <AddIcon className='text-white ' />, 
    google: <GoogleIcon className='text-white ' />, 
    facebook: <FacebookIcon className='text-white ' />, 
    apple: <AppleIcon className='text-white ' />, 
    redifine: <ReplayIcon className='text-white transform rotate-90 ' />, 
    offer: <LocalOfferIcon className='text-white ' />, 
    delete:  <DeleteOutlineOutlinedIcon className= " text-secondary" />,
    favorite: <FavoriteBorderIcon className='text-secondary'/>,
    filter: <FilterListOutlinedIcon className=' text-secondary' />

    //Exemplo de prático de aplicaçao
<div className="flex space-x-4 mx-6">
        <Buttons aria-label="Delete"  btnState="none"  btnSize="justIcons" icon="delete"onClick={() => console.log('Clicked!')}/>
        <Buttons btnState="none"  btnSize="justIcons" icon="filter"/>
        </div>
        <div className="mx-6">
        <Buttons btnState="defaultMain" text="Pagar agora" btnSize="mediumSizeSocials"/> 
  
    <Buttons btnState="defaultMain" text="Sustentável" icon="navigateNext" btnSize="menuSize" />
  <Buttons btnState="defaultMain" text="Promoções" icon="offer" btnSize="menuSize" />

      <Buttons aria-label="Next" btnState="defaultMain" text="Proximo" icon="navigateNext" btnSize="mediumSize"/>
      <Buttons btnState="defaultMain" text="Registar Conta" btnSize="mediumSizeSocials"/>google
      <Buttons btnState="secondaryMain" text="Continuar com Google" btnSize="mediumSizeSocials" icon=""/>
      <Buttons btnState="secondaryMain" text="Continuar com Facebook" btnSize="mediumSizeSocials" icon="facebook"/>
      <Buttons btnState="secondaryMain" text="Continuar com Maça" btnSize="mediumSizeSocials" icon="apple"/>
      <Buttons btnState="secondaryMain" text="Redefinir" btnSize="mediumSizeSocials" icon="redifine"/>
      <Buttons btnState="defaultMain" text="Registar Conta" btnSize="mediumSizeSocials"/>
      </div>

         <div className="mx-6">
        <Buttons
          btnState="whiteMain"
          text="Registar Conta"
          btnSize="whiteSize"
        />
      </div>  

*/
"use client";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import coloredGoogleIcon from "@/public/images/login/google_logo.svg";
import coloredFacebookIcon from "@/public/images/login/facebook_logo.svg";
import coloredAppleIcon from "@/public/images/login/aple_logo.svg";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import NotificationCart from "../items/NotificationCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import StartIcon from "@mui/icons-material/Start";
import Link from "next/link";
export const Buttons = ({
  onClick,
  btnState,
  text,
  icon,
  btnSize,
  ariaLabel,
  Disabled,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const StyledState = {
    defaultMain: "bg-primary_main hover:bg-primary_dark", //verde normal, com over (default o mais usado)
    hoverMain: "bg_primary_main",
    blackMain: "bg-black hover:bg-dark_gray",
    activeMain: "bg-black", // Nova classe para representar o estado ativo
    focusedMain: "bg-primary_dark",
    disabledMain: "bg-grey cursor-default", //para botoes que vao ficar disabled
    secondaryMain: "bg-dark hover:bg-dark_gray", //botoes secundários
    errorMain: "bg-error_main hover:bg-error_dark",
    galeryMain: "bg-transparent",
    none: "",
    whiteMain: "bg-white_opacity_50  border border-black",
  };
  const sizes = {
    whiteSize:
      "w-full h-55 px-8 py-4 mt-4 flex justify-center items-center border-2 border-black rounded gap-3 text-center",
    modalSize: "w-full h-14 gap-12 items-center",
    modelSize2:
      "w-full h-55 px-9 py-4 mt-4 flex justify-center items-center  text-center",
    modelSize3:
      "w-52 h-55 py-4 mt-4 flex justify-center items-center  text-center",
    smallSize:
      "w-full h-14 sm:h-14 md:h-14 lg:h-14 xl:h-14 flex items-center justify-between gap-2 sm:gap-4 text-center",
    menuSize:
      "w-full h-14 py-2 px-4 mt-4 flex gap-12 text-center justify-between items-center", //usado apenas no scroll menu
    mediumSize:
      "w-full h-full px-8 flex py-3.5 mt-4 gap-12 items-center justify-between", // usado no geral em açoes como concluir, enviar, carregar mais, proximo passo etc
    menuSize2: "w-full h-14 text-center justify-around px-14 mt-4 flex", //usado apenas no scroll menu
    menuSize3:
      "w-full h-14 py-3.5 border-2 text-center font-semibold rounded block  justify-center px-14  flex",
    menuSize4:
      "w-full h-14 py-3.5  text-center rounded justify-center px-14  flex",
    mediumSizeSocials:
      "w-full h-55 px-8 py-4 mt-4 flex justify-center items-center gap-3 text-center", // Social netwowrks
    redefineSize:
      "w-full h-55 px-3 py-9 mt-4 flex justify-center items-center gap-3 text-center", //usado para voltar para a galeria e redefinir
    large: "px-5 py-5  mt-4 text-lg", // caso pretendam um botao maior podem ajustar
    justIcons:
      "w-10 h-10 mx-auto my-auto justify-center items-center  text-center mt-4", //quando se quer usar so um icon como botao
    newIcons:
      "mr-4 w-10 h-10 mx-auto my-auto text-center flex items-center justify-center",
    newIconSet2: "mr-4 ",
    newIconSet3: "flex items-center justify-between mx-2",
    newIconSet4: "ml-1 mr-1",
    gallerySize: "w-full h-full px-7 py-3.5  min-[350px]:w-fit",
    iconPack: " w-full h-full flex text-5xl",
    filterSize:
      "w-full h-full px-8 py-3.5 flex justify-start min-[350px]:w-fit",
    modalButton:
      "flex flex-col items-end gap-2 px-2 ml-1 rounded-lg bg-primary-main text-white font-normal font-sans",
  };
  // iconmap define quais sao os icones nome: [icon material ui ou outros]
  const iconMap = {
    navigateNext: <NavigateNextIcon className="text-white" />,
    cancel: <CancelIcon className="text-white " />,
    add: <AddIcon className="text-white " />,
    google: (
      <Image
        src={coloredGoogleIcon}
        height={20}
        width={20}
        alt={"google icon"}
      />
    ),
    facebook: (
      <Image
        src={coloredFacebookIcon}
        height={22}
        width={22}
        alt={"facebook icon"}
      />
    ),
    apple: (
      <Image src={coloredAppleIcon} height={20} width={20} alt={"apple icon"} />
    ),
    redifine: <ReplayIcon className="text-white transform rotate-90 " />,
    redifine2: <ReplayIcon className="text-secondary transform rotate-90 " />,
    offer: <LocalOfferIcon className="text-white " />,
    delete: <DeleteOutlineOutlinedIcon className=" text-secondary" />,
    favorite: <FavoriteBorderIcon className="text-secondary" />,
    favorite2Navbar: <FavoriteBorderOutlinedIcon className="text-black" />,
    filter: <FilterListOutlinedIcon className=" text-secondary" />,
    bookmark: (
      <BookmarkBorderOutlinedIcon className="text-white text-center text-5xl" />
    ),
    bookmarkFull: <BookmarkIcon className="text-white text-5xl text-center" />,
    cropSquare: <CropSquareIcon className=" text-secondary text-4xl" />,
    cropSquare2View: <CropSquareIcon className="text-black text-4xl" />,
    menuIcon: <MenuIcon className="text-black" />,
    notificationCart: <NotificationCart className="text-black" />,
    localBag: <LocalMallOutlinedIcon className="text-black" />,
    account: <AccountCircleOutlinedIcon className="text-black" />,
    closeOutline: <CloseOutlinedIcon className="text-black" />,
    nextStart: <StartIcon className="text-white"></StartIcon>,
  };

  const selectedIcon = iconMap[icon] || null;

  return (
    <button
      onClick={handleClick}
      className={`flex font-semibold font-inter  rounded ${sizes[btnSize]} ${StyledState[btnState]} mx-auto items-center`}
      aria-label={ariaLabel || text}
      disabled={Disabled}
    >
      {["google", "facebook", "apple", "redifine"].includes(icon) && (
        <span>{selectedIcon}</span>
      )}
      <span
        className={`${!selectedIcon ? "text-center" : ""} ${
          btnState === "whiteMain" ? "text-black" : "text-white"
        }`}
      >
        {text}
      </span>

      {!["google", "facebook", "apple", "redifine"].includes(icon) && (
        <span>{selectedIcon}</span>
      )}
    </button>
  );
};
