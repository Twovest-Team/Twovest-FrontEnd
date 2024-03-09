'use client'

import { useAppDispatch } from "@/redux/hooks"
import { closeModal } from "@/redux/slices/modalSlice"
import deleteCollection from "@/utils/db/collections/deleteCollection"
import Modal from "../modals/Modal"
import { redirect } from "next/dist/server/api-utils"
import useAuth from "@/hooks/useAuth"

const DeleteCollectionModal = ({isOwnCollection, collectionId}) => {

    const dispatch = useAppDispatch()
    const currentUser = useAuth()

    async function handleDelete(){
        if(!isOwnCollection) return null
        let isDeleted = await deleteCollection(collectionId)
        dispatch(closeModal('deleteCollectionWarning'))
        if (isDeleted) redirect(`profile/${currentUser.id}/collections`)
        alert('is deleted? ' + isDeleted)
        
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