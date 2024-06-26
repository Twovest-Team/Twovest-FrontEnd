'use client'

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
import LeaveCollectionModal from './LeaveCollectionModal';

const MenuCollection = ({ collectionId, isAdmin, isMember, privacy }) => {

    const dispatch = useAppDispatch()

    return (
        <>
            <div className='relative z-30' >

                <Menu>

                    <Menu.Button>
                        <IconButton
                            ariaLabel={'Opções da coleção'}
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

                            {(isAdmin || isMember) &&
                                <Menu.Item className="w-full">
                                    <button onClick={() => dispatch(openModal('changeCollectionName'))} className='hover:bg-grey_opacity_50 px-6 py-2 text-left text-caption '>
                                        Alterar nome
                                    </button>
                                </Menu.Item>
                            }

                            {isAdmin &&
                                <Menu.Item className="w-full">
                                    <button onClick={() => dispatch(openModal('changeCollectionPrivacy'))} className='hover:bg-grey_opacity_50 px-6 py-2 text-left text-caption '>
                                        Gerir privacidade
                                    </button>
                                </Menu.Item>
                            }

                            {privacy === 2 &&
                                <Menu.Item className="w-full">
                                    <button className='hover:bg-grey_opacity_50 px-6 py-2 text-left text-caption '>
                                        Partilhar
                                    </button>
                                </Menu.Item>
                            }

                            {(isAdmin || isMember) &&
                                <Menu.Item className="w-full">
                                    <Link href={`/collection/${collectionId}/details`} className='block hover:bg-grey_opacity_50 px-6 py-2 text-left text-caption '>
                                        Informações
                                    </Link>
                                </Menu.Item>
                            }

                            {isAdmin &&
                                <Menu.Item className="w-full">
                                    <button onClick={() => dispatch(openModal('deleteCollectionWarning'))} className='hover:bg-grey_opacity_50 text-error_main px-6 py-2 text-left text-caption '>
                                        Eliminar esta coleção
                                    </button>
                                </Menu.Item>
                            }

                            {(!isAdmin && isMember) &&
                                <Menu.Item className="w-full">
                                    <button onClick={() => dispatch(openModal('leaveCollectionWarning'))} className='hover:bg-grey_opacity_50 text-error_main px-6 py-2 text-left text-caption '>
                                        {'Sair da coleção ->'}
                                    </button>
                                </Menu.Item>
                            }

                        </Menu.Items>
                    </Transition>
                </Menu>
            </div >

            <UpdateCollectionNameModal collectionId={collectionId} />

            <UpdateCollectionPrivacyModal collectionId={collectionId} privacy={privacy} />

            <DeleteCollectionModal isAdmin={isAdmin} collectionId={collectionId} />

            <LeaveCollectionModal collectionId={collectionId} />

        </>

    )
}

export default MenuCollection