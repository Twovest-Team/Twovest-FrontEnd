'use client'

import Modal from "../modals/Modal"
import { useAppDispatch } from "@/redux/hooks"
import { openModal } from "@/redux/slices/modalSlice"
import { useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import CollectionPreview from "./CollectionPreview"
import useAuth from "@/hooks/useAuth"

const InvitationToCollection = ({ collectionId, collectionShareId, addMemberToCollection }) => {

    const currentUser = useAuth()
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const invitation = searchParams.get('invite')

    // if (invitation !== collectionShareId || !invitation) return null

    useEffect(() => {
        if (invitation === collectionShareId) dispatch(openModal(`acceptInvite${collectionId}`))
        return null
    }, [])


    return (
        <div className="h-screen">
            <Modal
                id={`acceptInvite${collectionId}`}
            >
                <div className='flex flex-col'>
                    {/* <CollectionPreview collection={collectionData} /> */}
                    <h6 className='font-semibold'>Convite para coleção</h6>
                    <p className='text-secondary'>Queres entrar nesta coleção?.</p>
                </div>

                <button onClick={() => addMemberToCollection(currentUser.id)} className="bg-dark text-white font-semibold px-9 py-3.5 rounded w-full">
                    Entrar na coleção
                </button>
            </Modal>
        </div>
    )

}

export default InvitationToCollection