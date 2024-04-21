'use client'

import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@/components/buttons/icons/IconButton";
import Modal from '../modals/Modal';
import { useAppDispatch } from '@/redux/hooks';
import { openModal } from '@/redux/slices/modalSlice';
import Link from 'next/link';
import UpdateCollectionNameModal from './UpdateCollectionNameModal';
import DeleteCollectionModal from './DeleteCollectionModal';
import UpdateCollectionPrivacyModal from './UpdateCollectionPrivacyModal';
import Button from '../buttons/Button';

const MenuCollection = ({ collectionId, isOwnCollection, isMember, privacy }) => {

    const dispatch = useAppDispatch()

    return (
        <>
            <div className='relative z-10' >
                <Menu>

                    <Menu.Button>
                        <IconButton
                            icon={<MoreVertIcon />}
                        />
                    </Menu.Button>


                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0">
                        <Menu.Items
                            className="absolute top-2 right-0 flex-wrap py-3 bg-white w-[220px] shadow rounded">

                            {(isOwnCollection || isMember) &&
                                <Menu.Item className="w-full">
                                    <button onClick={() => dispatch(openModal('changeCollectionName'))} className='hover:bg-grey_opacity_50 px-6 py-2 text-left caption '>
                                        Alterar nome
                                    </button>
                                </Menu.Item>
                            }

                            {isOwnCollection &&
                                <Menu.Item className="w-full">
                                    <button onClick={() => dispatch(openModal('changeCollectionPrivacy'))} className='hover:bg-grey_opacity_50 px-6 py-2 text-left caption '>
                                        Gerir privacidade
                                    </button>
                                </Menu.Item>
                            }

                            {privacy === 2 &&
                                <Menu.Item className="w-full">
                                    <button className='hover:bg-grey_opacity_50 px-6 py-2 text-left caption '>
                                        Partilhar
                                    </button>
                                </Menu.Item>
                            }

                            <Menu.Item className="w-full">
                                <Link href={`/collection/${collectionId}/details`} className='block hover:bg-grey_opacity_50 px-6 py-2 text-left caption '>
                                    Informações
                                </Link>
                            </Menu.Item>

                            {isOwnCollection &&
                                <Menu.Item className="w-full">
                                    <button onClick={() => dispatch(openModal('deleteCollectionWarning'))} className='hover:bg-grey_opacity_50 text-error_main px-6 py-2 text-left caption '>
                                        Eliminar esta coleção
                                    </button>
                                </Menu.Item>
                            }

                            {(!isOwnCollection && isMember) &&
                                <Menu.Item className="w-full">
                                    <button onClick={() => dispatch(openModal('leaveCollectionWarning'))} className='hover:bg-grey_opacity_50 text-error_main px-6 py-2 text-left caption '>
                                        Saír da coleção
                                    </button>
                                </Menu.Item>
                            }

                        </Menu.Items>
                    </Transition>
                </Menu>
            </div >

            <UpdateCollectionNameModal collectionId={collectionId} />

            <UpdateCollectionPrivacyModal collectionId={collectionId} privacy={privacy} />

            <DeleteCollectionModal isOwnCollection={isOwnCollection} collectionId={collectionId} />

            <Modal id={'leaveCollectionWarning'}>
                <div>
                    <h1 className='font-semibold text_h6'>Sair da coleção?</h1>
                    <p className='text-secondary'>Queres mesmo sair da coleção? Qualquer look adicionado por ti também deixará de estar disponível para os outros membros.</p>
                </div>


                <Button type={'error'} ariaLabel='Sair da coleção' width='full'>
                Sair da coleção
                </Button>

            </Modal>


        </>

    )
}

export default MenuCollection