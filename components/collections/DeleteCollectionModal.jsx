'use client'

import { useAppDispatch } from "@/redux/hooks"
import { closeModal } from "@/redux/slices/modalSlice"
import deleteCollection from "@/utils/db/collections/deleteCollection"
import Modal from "../modals/Modal"
import { useRouter } from 'next/navigation'
import useAuth from "@/hooks/client-hooks/useAuth"
import Button from "../buttons/Button"

const DeleteCollectionModal = ({ isAdmin, collectionId }) => {

    const dispatch = useAppDispatch()
    const currentUser = useAuth()
    const router = useRouter()

    async function handleDelete() {
        if (!isAdmin) return null
        let isDeleted = await deleteCollection(collectionId)
        dispatch(closeModal('deleteCollectionWarning'))
        if (isDeleted) router.push(`/profile/${currentUser.id}?option=coleções`)
        router.refresh();
    }

    return (
        <Modal id={'deleteCollectionWarning'}>
            <div>
                <h1 className='font-semibold text-h6'>Eliminar esta coleção?</h1>
                <p className='text-secondary'>Não vais conseguir recuperar esta coleção depois de a eliminares.</p>
            </div>

            <Button onClick={handleDelete} type={'error'} ariaLabel='Eliminar coleção' width='100%'>
                Eliminar defnitivamente
            </Button>
        </Modal>
    )
}

export default DeleteCollectionModal