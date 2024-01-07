'use client'

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useRef } from 'react';

const Notifications = ({ type, message }) => {

    const divRef = useRef(null)

    let customStyles;

    // Consoante o tipo de notificação, são atribuidos estilos diferentes
    switch (type) {
        case 'Neutral':
            customStyles = 'bg-dark text-white'
            break;
        case 'Success':
            customStyles = 'bg-primary_light text-primary_dark'
            break;
        case 'Error':
            customStyles = 'bg-error_light text-error_dark'
            break;
        case 'Informational':
            customStyles = 'bg-info_light text-info_dark'
            break;
    }

    // Timeout para fazer a notificação desaparecer passado 3s
    setTimeout(() => {
        if(divRef){
         divRef.current.style.display = 'none'
        }
    }, 3000)
    

    return (
        <div
        ref={divRef}
        className={`${customStyles} caption rounded-full flex gap-2 items-center font-semibold shadow-md px-7 py-3 fixed bottom-10 mx-auto left-6 right-6 w-fit`}>
            {type === 'Success' ?
                <CheckIcon /> :
                type === 'Error' ?
                    <CloseIcon /> :
                    type === 'Informational' &&
                    <InfoOutlinedIcon />
            }
            {message}
        </div>
    )
}

export default Notifications