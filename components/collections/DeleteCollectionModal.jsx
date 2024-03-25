'use client'

import { useAppDispatch } from "@/redux/hooks"
import { closeModal } from "@/redux/slices/modalSlice"
import deleteCollection from "@/utils/db/collections/deleteCollection"
import Modal from "../modals/Modal"
import { useRouter } from 'next/navigation'
import useAuth from "@/hooks/client-hooks/useAuth"

const DeleteCollectionModal = ({isOwnCollection, collectionId}) => {

    const dispatch = useAppDispatch()
    const currentUser = useAuth()
    const router = useRouter()

    async function handleDelete(){
        if(!isOwnCollection) return null
        let isDeleted = await deleteCollection(collectionId)
        dispatch(closeModal('deleteCollectionWarning'))
        alert('is deleted? ' + isDeleted)
        console.log(currentUser)
        if (isDeleted) router.push(`/profile/${currentUser.id}/collections`)
    }

    return (
        <Modal id={'deleteCollectionWarning'}>
            <div>
                <h6 className='font-semibold'>Eliminar esta coleção?</h6>
                <p className='text-secondary'>Não vais conseguir recuperar esta coleção depois de a eliminares.</p>
            </div>

            <button onClick={handleDelete} className="bg-error_main w-full text-white font-semibold px-9 py-3.5 rounded">
                Eliminar defnitivamente
            </button>
        </Modal>
    )
}

export default DeleteCollectionModal