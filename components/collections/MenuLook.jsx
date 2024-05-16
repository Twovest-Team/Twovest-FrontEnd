'use client'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
            <div className='w-full flex justify-end mt-1' >
                <IconButton
                    icon={<MoreHorizIcon />}
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