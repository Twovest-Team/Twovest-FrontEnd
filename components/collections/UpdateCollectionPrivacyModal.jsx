'use client'

import Modal from "../modals/Modal"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { closeModal } from "@/redux/slices/modalSlice"
import updateCollectionPrivacy from "@/utils/db/collections/updateCollectionPrivacy"
import { useState, useEffect } from "react"

const UpdateCollectionPrivacyModal = ({ collectionId, privacy }) => {

    const dispatch = useAppDispatch()
    const isOpen = useAppSelector(state => state.modals['changeCollectionPrivacy']);

    const [currentValue, setCurrentValue] = useState(privacy)
    const [isValid, setIsValid] = useState(false)

    async function updatePrivacy() {
        if (!isValid) return null
        let isUpdated = await updateCollectionPrivacy(collectionId, currentValue)
        dispatch(closeModal('changeCollectionPrivacy'))
        alert('is privacy updated? ' + isUpdated)
    }

    async function handlePrivacyChange(e) {
        
        let value = e.currentTarget.value
        if (value != privacy) setIsValid(true)
        if (value == privacy) setIsValid(false)
        setCurrentValue(value)
    }

    useEffect(() => {
        // Clear the states after modal closes
        if (!isOpen) {
            setTimeout(() => {
                setIsValid(false)
            }, 1000)
        }
    }, [isOpen])


    return (
        <Modal id={'changeCollectionPrivacy'}>
            <div>
                <h6 className='font-semibold'>Gerir privacidade da coleção</h6>
                <p className='text-secondary'>Decide quem tem acesso a esta coleção.</p>
            </div>

            <fieldset>
                <div>
                    <input onClick={e => handlePrivacyChange(e)} type="radio" id="private" name="privacy" value={1} defaultChecked={privacy === 1} />
                    <label for="private">Privada</label>
                </div>

                <div>
                    <input onClick={e => handlePrivacyChange(e)} type="radio" id="public" name="privacy" value={2} defaultChecked={privacy === 2} />
                    <label for="public">Pública</label>
                </div>
            </fieldset>

            <button
                disabled={!isValid}
                onClick={updatePrivacy}
                className={ `bg-dark w-full text-white font-semibold px-9 py-3.5 rounded ${!isValid && 'opacity-30 cursor-not-allowed'} `}>
                Alterar privacidade
            </button>
        </Modal >
    )
}

export default UpdateCollectionPrivacyModal