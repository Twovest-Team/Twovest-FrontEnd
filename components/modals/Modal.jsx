'use client'

import CloseIcon from "@mui/icons-material/Close";
import { Transition } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { useEffect } from "react";
import IconButton from "../buttons/icons/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { KeyboardArrowLeft } from "@mui/icons-material";



// ______________________________________________________________________________

// RULES

// Specify an id for the modal.

// Choose a size between sm, md or lg. The default size is sm.

// If you want a modal with a side image, use imageUrl and imageAlt.

// All the modal content should be created inside the <Modal> tag, for example:

// <Modal id='login' imageUrl='https://example.com' imageAlt='Example'>
//  <p>Hello World</p>
// </Modal>

// To open a modal: <button onClick={() => dispatch(openModal('login'))}>Open login modal</button>

// ______________________________________________________________________________


const Modal = ({ children, id, size, imageUrl, imageAlt, goBackFn }) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(state => state.modals[id]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                dispatch(closeModal(id));
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, dispatch, id]);

    const handleCloseModal = () => {
        dispatch(closeModal(id));
    };

    const handleContentClick = (e) => {
        // // Prevent modal closing when clicking inside the content area
        // e.stopPropagation();
    };

    const getModalWidth = () => {
        switch (size) {
            case 'sm':
            default:
                return 'sm:w-[600px]'
            case 'md':
                return 'sm:w-[600px] md:w-[728px]'
            case 'lg':
                return 'sm:w-[600px] md:w-[728px] lg:w-[984px]'
        }
    }

    const getModalImageWidth = () => {
        switch (size) {
            case 'sm':
            default:
                return 'w-[240px]'
            case 'md':
                return 'sm:w-[240px] md:w-[340px]'
            case 'lg':
                return 'sm:w-[240px] md:w-[340px] lg:w-[420px]'
        }
    }

    return (
        <Transition show={isOpen || false}>



            <section
                className={`bg-black backdrop-blur-sm bg-opacity-30 left-0 right-0 top-0 bottom-0 fixed h-full w-full z-40`}
                onClick={handleCloseModal}
            />

            <Transition.Child
                enter='ease-out duration-100'
                enterFrom='opacity-0 translate-y-8 sm:-translate-y-[45%] sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:-translate-y-1/2 sm:scale-100'
                leave='ease-in duration-100'
                leaveFrom='opacity-100 translate-y-0 sm:-translate-y-1/2 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:-translate-y-[45%] sm:scale-95'
                className={'fixed bottom-0 sm:bottom-auto sm:top-1/2 left-0 right-0 z-50 mx-auto w-screen sm:w-fit h-auto'}
            >
                <div
                    className={`bg-white text-black flex ${getModalWidth()} sm:rounded w-full items-stretch transition-all duration-150`}
                    onClick={handleContentClick} // Handle clicks inside the content area
                >
                    {imageUrl && (
                        <div className={`${getModalImageWidth()} relative`}>
                            <Image
                                className="object-cover sm:rounded-l"
                                alt={imageAlt}
                                src={imageUrl}
                                fill
                            />
                        </div>
                    )}
                    <div className="pb-16 pt-5 flex-grow">
                        <div className="container flex flex-col gap-8">
                            <div className="flex justify-between text-secondary">
                                {goBackFn &&
                                    <IconButton
                                        icon={<KeyboardArrowLeft sx={{ fontSize: 29 }} />}
                                        onClick={() => goBackFn()}
                                    />
                                }

                                <div className="ml-auto">
                                <IconButton
                                    icon={<CloseIcon />}
                                    onClick={handleCloseModal}
                                />
                                </div>
                                
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </Transition.Child>


        </Transition >
    );
};

export default Modal;

