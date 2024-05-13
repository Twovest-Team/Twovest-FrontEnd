'use client'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "../buttons/icons/IconButton";
import Modal from '../modals/Modal';
import { useAppDispatch } from '@/redux/hooks';
import { closeModal, openModal } from '@/redux/slices/modalSlice';
import deleteCollectionLook from '@/utils/db/collections/deleteCollectionLook';


const MenuLook = ({ collectionId, lookId, isMember }) => {
    const dispatch = useAppDispatch()

    async function handleRemove() {
        const isRemoved = await deleteCollectionLook(collectionId, lookId)
        alert('is removed? ' + isRemoved)
        dispatch(closeModal(`look${lookId}Details`))
    }

    return (
        <>
            <div>
                <span className='w-full h-28 absolute top-0 right-0 bg-gradient-to-b from-dark opacity-70 rounded' />

                <IconButton
                className='absolute top-2 right-1 text-white'
                    darkMode={true}
                    icon={<MoreVertIcon />}
                    onClick={() => dispatch(openModal(`look${lookId}Details`))}
                />
            </div >

            <Modal id={`look${lookId}Details`}>
                Info look

                {isMember &&
                    <button onClick={handleRemove} className="bg-error_main w-fit text-white font-semibold px-9 py-3.5 rounded">
                        Remover look
                    </button>
                }

            </Modal>

        </>



    )
}

export default MenuLook