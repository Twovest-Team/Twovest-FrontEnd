'use client'

import { useEffect, useState } from "react"
import Modal from "../modals/Modal"
import updateCollectionName from "@/utils/db/collections/updateCollectionName"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { closeModal } from "@/redux/slices/modalSlice"
import { revalidatePath } from "next/cache"

const UpdateCollectionNameModal = ({ collectionId }) => {

    const dispatch = useAppDispatch()
    const isOpen = useAppSelector(state => state.modals['changeCollectionName']);

    let [inputState, setInputState] = useState('')
    let [isValid, setIsValid] = useState(false)

    function handleInputValue(e) {
        const value = e.currentTarget.value;
        setInputState(value);
        setIsValid(value.trim().length > 0);
    }
    

    async function handleSubmit() {
        if (isValid && inputState) {
            const isNameUpdated = await updateCollectionName(collectionId, inputState)
            dispatch(closeModal('changeCollectionName'))
            alert('Nome alterado?' + isNameUpdated)
            revalidatePath(`/collection/${collectionId}`, 'page')
        }
    }

    useEffect(() => {
        // Clear the states after modal closes
        if (!isOpen) {
            setTimeout(() => {
                setInputState('')
                setIsValid(false)
            }, 1000)
        }
    }, [isOpen])

    return (
        <Modal id={'changeCollectionName'}>
            <div>
                <h6 className='font-semibold'>{inputState || 'Alterar nome'}</h6>
                <p className='text-secondary'>Que nome queres dar a esta coleção?</p>
            </div>

            <input className="border" value={inputState} onChange={e => handleInputValue(e)} placeholder="Nome da coleção"></input>
            <button
                disabled={!isValid}
                onClick={handleSubmit}
                className={
                    `bg-dark w-full text-white font-semibold px-9 py-3.5 rounded ${!isValid && 'opacity-30 cursor-not-allowed'}`} >
                Alterar nome
            </button>
        </Modal>
    )
}

export default UpdateCollectionNameModal