import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReplayIcon from '@mui/icons-material/Replay';

export const Buttons = ({ btnState, text, icon, btnSize, onClick }) => {
  const StyledState = {
    defaultMain: 'bg-primary_main hover:bg-primary_dark',  //verde normal, com over (default o mais usado)
    hoverMain: 'bg-primary_dark ',
    focusedMain: 'bg-primary_dark', 
    disabledMain: 'bg-grey_opacity_50',  //para botoes que vao ficar disabled 
    secondaryMain:'bg-dark hover:bg-dark_gray',  //botoes secundários
    

  };
  const sizes = {
    menuSize: 'w-2/4 h-14 px-3 py-2 mt-4 flex justify-between items-center', //usado apenas no scroll menu
    mediumSize: 'w-full h-auto min-h-50 px-8 py-3.5 mt-4 gap-12 items-center justify-between', // usado no geral em açoes como concluir, enviar, carregar mais, proximo passo etc
    mediumSizeSocials: 'w-full h-55 px-8 py-3.5 mt-4 flex justify-center items-center gap-3 text-center',  // Social netwowrks
    redefineSize: 'w-full h-55 px-3 py-9 mt-4 flex justify-center items-center gap-3 text-center',  //usado para voltar para a galeria e redefinir
    large: 'px-5 py-5  mt-4 text-lg', // caso pretendam um botao maior podem ajustar          
  };
// iconmap define quais sao os icones nome: [icon material ui ou outros]
  const iconMap = {
    navigateNext: <NavigateNextIcon className='text-white'/>,
    cancel: <CancelIcon className='text-white ' />,
    add: <AddIcon className='text-white ' />, 
    google: <GoogleIcon className='text-white ' />, 
    facebook: <FacebookIcon className='text-white ' />, 
    apple: <AppleIcon className='text-white ' />, 
    redifine: <ReplayIcon className='text-white transform rotate-90 ' />, 
    offer: <LocalOfferIcon className='text-white ' />, 
  };
  
const selectedIcon = iconMap[icon] || null;

  return (
    <button className={`flex font-semibold font-inter aria-label="${text}" rounded ${sizes[btnSize]} ${StyledState[btnState]}`} onClick={onClick}>
       {['google', 'facebook', 'apple', 'redifine'].includes(icon) && <span>{selectedIcon}</span>}
       <span className={`text-white min-w-fit ${!selectedIcon ? 'mx-auto pl-12' : ''}`}>{text}</span>
{!['google', 'facebook', 'apple', 'redifine'].includes(icon) && <span>{selectedIcon}</span>}
    </button>
  );
};


