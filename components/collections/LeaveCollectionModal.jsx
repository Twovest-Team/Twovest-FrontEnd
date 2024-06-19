'use client'

import Modal from "../modals/Modal"
import { useRouter } from 'next/navigation'
import Button from "../buttons/Button"
import useAuth from "@/hooks/client-hooks/useAuth"
import removeMemberFromCollection from "@/utils/db/collections/removeMemberFromCollection"
import { useAppDispatch } from "@/redux/hooks"
import { closeModal } from "@/redux/slices/modalSlice"

const LeaveCollectionModal = ({ collectionId }) => {

    const router = useRouter()
    const { currentUser } = useAuth()
    const dispatch = useAppDispatch()

    const handleLeave = async () => {
        const isRemoved = await removeMemberFromCollection(collectionId, currentUser.id)
        alert('is user removed? ' + isRemoved);
        router.push(`/profile/${currentUser.id}/collections`);
        dispatch(closeModal('leaveCollectionWarning'))
        router.refresh()
    }

    return (
        <Modal id={'leaveCollectionWarning'}>
            <div>
                <h1 className='font-semibold text_h6'>Sair da coleção?</h1>
                <p className='text-secondary'>Queres mesmo sair da coleção? Qualquer look adicionado por ti também deixará de estar disponível para os outros membros.</p>
            </div>


            <Button onClick={handleLeave} type={'error'} ariaLabel='Sair da coleção' width='100%'>
                Sair da coleção
            </Button>

        </Modal>
    )
}

export default LeaveCollectionModal