import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
export const Buttons = ({ btnState, text, icon,btnSize, onClick }) => {
  const StyledState = {
    defaultMain: 'bg-primary_main',
    hoverMain: 'bg-primary_dark',
    focusedMain: 'bg-primary_dark',
    disabledMain: 'bg-grey_opacity_50',
    secondaryMain:'bg-dark',
    

  };
  const sizes = {
    menuSize: 'w-2/4 h-14 px-3 py-2 mt-4 flex justify-between items-center text-sm',
    mediumSize: 'w-full h-auto min-h-50 px-8 py-3.5 mt-4 gap-12 items-center justify-between text-base', 
    mediumSizeSocials: 'w-full h-55 px-8 py-3.5 mt-4 flex justify-center items-center gap-3 text-base text-center',
    large: 'px-5 py-5  mt-4 text-lg', // caso pretendam um botao maior podem ajustar          
  };

  const iconMap = {
    navigateNext: <NavigateNextIcon className='text-white'/>,
    cancel: <CancelIcon className='text-white ' />,
    add: <AddIcon className='text-white ' />, 
    google: <GoogleIcon className='text-white ' />, 
    facebook: <FacebookIcon className='text-white ' />, 
    apple: <AppleIcon className='text-white ' />, 
  };
  
const selectedIcon = iconMap[icon] || null;

  return (
    <button className={`flex  rounded ${sizes[btnSize]} ${StyledState[btnState]}`} onClick={onClick}>
       {['google', 'facebook', 'apple'].includes(icon) && <span>{selectedIcon}</span>}
       <span className={`text-white min-w-fit ${!selectedIcon ? 'mx-auto pl-12' : ''}`}>{text}</span>
{!['google', 'facebook', 'apple'].includes(icon) && <span>{selectedIcon}</span>}
    </button>
  );
};


