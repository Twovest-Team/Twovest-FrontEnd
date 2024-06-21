'use client'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "../buttons/icons/IconButton";
import Modal from '../modals/Modal';
import { useAppDispatch } from '@/redux/hooks';
import { closeModal, openModal } from '@/redux/slices/modalSlice';
import deleteCollectionLook from '@/utils/db/collections/deleteCollectionLook';
import Button from '../buttons/Button';
import getPortugueseDateString from '@/utils/getPortugueseDateString';
import Image from 'next/image';
import getStorageImage from '@/utils/getStorageImage';


const MenuLook = ({ submitter, collectionId, look, isMember }) => {
    const dispatch = useAppDispatch()

    async function handleRemove() {
        const isRemoved = await deleteCollectionLook(collectionId, look.id)
        alert('is removed? ' + isRemoved)
        dispatch(closeModal(`look${look.id}Details`))
    }

    return (
        <>
            <div>
                <span className='w-full h-28 absolute top-0 right-0 bg-gradient-to-b from-dark opacity-70 rounded' />

                <IconButton
                    className='absolute top-2 right-1 text-white'
                    darkMode={true}
                    icon={<MoreVertIcon />}
                    onClick={() => dispatch(openModal(`look${look.id}Details`))}
                />
            </div >

            <Modal id={`look${look.id}Details`}>

                <div className='w-1/3 average:w-1/2 aspect-[17/26] relative container'>
                    <Image className='object-cover rounded bg-grey_opacity_50' src={getStorageImage(look.url_image)} fill={true} alt='' />
                </div>



                <div className='flex justify-center flex-wrap items-center gap-3'>
                    <span className='flex gap-2 items-center caption font-semibold text-black rounded-full px-4 border-2 border-grey_opacity_50 h-12'>
                        Adicionado em {getPortugueseDateString(submitter.date)}
                    </span>

                </div>


                {isMember &&

                    <>
                        <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
                            <Button onClick={() => dispatch(closeModal(`look${look.id}Details`))} className="border border-grey_opacity_50 shadow-sm" type="white" width="100%" ariaLabel="Cancelar">
                                Cancelar
                            </Button>

                            <Button type='error' onClick={handleRemove} ariaLabel='Remover look' width='100%'>
                                Remover look
                            </Button>
                        </div>
                    </>


                }

            </Modal>

        </>



    )
}

export default MenuLook