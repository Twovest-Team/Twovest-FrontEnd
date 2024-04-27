'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { hideNotification } from '@/redux/slices/notificationSlice';
import { Transition } from '@headlessui/react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect } from 'react';

const Notification = ({ id, type, message }) => {
    
    const dispatch = useAppDispatch()
    const show = useAppSelector(state => state.notifications[id])

    useEffect(() => {
        if(show){
            setTimeout(() => {
                dispatch(hideNotification(id))
            }, 2000) // Control notification showcase time here
        }
    }, [show])

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

    return (
        <div className='fixed top-10 md:top-auto md:bottom-10 mx-auto left-6 right-6 w-fit z-50 '>
            <Transition
                show={show || false}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <div
                    className={`${customStyles} rounded-full flex gap-2 items-center font-semibold shadow-lg px-7 py-3`}>
                    {type === 'Success' ?
                        <CheckIcon /> :
                        type === 'Error' ?
                            <CloseIcon /> :
                            type === 'Informational' &&
                            <InfoOutlinedIcon />
                    }
                    {message}
                </div>
            </Transition>
        </div>

    )
}

export default Notification