'use client'

import CloseIcon from "@mui/icons-material/Close";
import { Transition } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { closeModal, getCurrentModalState } from "@/redux/slices/modalSlice";
import Image from "next/image";
import { useEffect } from "react";


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


const Modal = ({ children, id, size, imageUrl, imageAlt }) => {
   
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(state => state.modals[id]);

    const handleCloseModal = () => {
        dispatch(closeModal(id));
    };

    const handleContentClick = (e) => {
        // Prevent modal closing when clicking inside the content area
        e.stopPropagation();
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
                className={`bg-black bg-opacity-30 left-0 right-0 top-0 bottom-0 fixed h-full w-full flex flex-col justify-end sm:justify-center sm:items-center z-50`}
                onClick={handleCloseModal}
            >
                <Transition.Child
                    enter='ease-out duration-100'
                    enterFrom='opacity-0 translate-y-2 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-100'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-2 sm:scale-95'
                >
                    <div
                        className={`bg-white flex ${getModalWidth()} sm:rounded w-full items-stretch`}
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
                        <div className="pb-20 pt-5 flex-grow">
                            <div className="container flex flex-col gap-8">
                                <div className="flex justify-end">
                                    <button onClick={handleCloseModal}>
                                        <CloseIcon className="text-secondary cursor-pointer" />
                                    </button>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </section>
        </Transition>
    );
};

export default Modal;

