'use client'

import CloseIcon from "@mui/icons-material/Close";
import { Transition } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { useEffect } from "react";
import IconButton from "../buttons/icons/IconButton";
import { KeyboardArrowLeft } from "@mui/icons-material";
import useWindow from "@/hooks/client-hooks/useWindow";


// ______________________________________________________________________________

// RULES

// Specify an id for the modal.

// Choose a size between sm, md or lg. The default size is sm.

// If you want a modal with a side image, use imageSrc and imageAlt.

// All the modal content should be created inside the <Modal> tag, for example:

// <Modal id='login' imageSrc='https://example.com' imageAlt='Example'>
//  <p>Hello World</p>
// </Modal>

// To open a modal: <button onClick={() => dispatch(openModal('login'))}>Open login modal</button>

// ______________________________________________________________________________


const Modal = ({ children, id, size, imageSrc, imageAlt, goBackFn, onClose, onlyMobile, maxSm, maxMd, restricted }) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(state => state.modals[id]);
    const { isMobile, isSm, isMd } = useWindow();

    useEffect(() => {
        if (!restricted) {
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') {
                    handleCloseModal()
                }
            };

            if (isOpen) {
                window.addEventListener('keydown', handleKeyDown);
            }

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, dispatch, id]);

    const handleCloseModal = () => {
        if (restricted) return null
        { onClose && onClose() }
        dispatch(closeModal(id));
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

    if (!isMobile && onlyMobile) return null
    if (!isMobile && !isSm && maxSm) return null
    if (!isMobile && !isSm && !isMd && maxMd) return null

    return (
        <Transition show={isOpen || false}>

            <section
                className={`bg-black backdrop-blur-sm bg-opacity-30 left-0 right-0 top-0 bottom-0 fixed h-full w-full z-40`}
                onClick={restricted ? undefined : handleCloseModal}
            />

            <Transition.Child
                enter='ease-out duration-100'
                enterFrom='opacity-0 translate-y-8 sm:-translate-y-[45%] sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:-translate-y-1/2 sm:scale-100'
                leave='ease-in duration-100'
                leaveFrom='opacity-100 translate-y-0 sm:-translate-y-1/2 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:-translate-y-[45%] sm:scale-95'
                className='
                fixed overflow-auto
                bottom-0 sm:bottom-auto 
                sm:top-1/2 
                left-0 sm:left-1/2
                sm:-translate-y-1/2 sm:-translate-x-1/2 
                right-0 sm:right-auto
                z-50
                mx-auto
                w-screen sm:w-fit
                max-h-full h-fit'
            >
                <div
                    className={`bg-white text-black flex ${getModalWidth()} max-h-full h-fit sm:rounded w-full items-stretch transition-all duration-150`}
                >
                    {imageSrc && (
                        <div className={`${getModalImageWidth()} relative`}>
                            <Image
                                className="object-cover sm:rounded-l"
                                alt={imageAlt}
                                src={imageSrc}
                                fill
                            />
                        </div>
                    )}
                    <div className="pb-8 pt-5 flex-grow max-h-full h-fit">
                        <div className="container flex flex-col gap-2">
                            <div className="flex justify-between text-secondary">
                                {goBackFn &&
                                    <IconButton
                                        icon={<KeyboardArrowLeft sx={{ fontSize: 29 }} />}
                                        onClick={() => goBackFn()}
                                    />
                                }

                                {!restricted ?
                                    <div className="ml-auto">
                                        <IconButton
                                            icon={<CloseIcon />}
                                            onClick={handleCloseModal}
                                        />
                                    </div>
                                    :
                                    <span className="mt-4" />
                                }
                            </div>

                            <div className="flex flex-col gap-6">
                                {children}
                            </div>

                        </div>
                    </div>
                </div>
            </Transition.Child>


        </Transition >
    );
};

export default Modal;

