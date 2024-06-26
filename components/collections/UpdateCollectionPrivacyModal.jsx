'use client'

import Modal from "../modals/Modal"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { closeModal } from "@/redux/slices/modalSlice"
import updateCollectionPrivacy from "@/utils/db/collections/updateCollectionPrivacy"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const UpdateCollectionPrivacyModal = ({ collectionId, privacy }) => {

    const dispatch = useAppDispatch()
    const isOpen = useAppSelector(state => state.modals['changeCollectionPrivacy']);
    const router = useRouter()

    const [currentValue, setCurrentValue] = useState(privacy)
    const [isValid, setIsValid] = useState(false)

    async function updatePrivacy() {
        if (!isValid) return null
        let isUpdated = await updateCollectionPrivacy(collectionId, currentValue)
        dispatch(closeModal('changeCollectionPrivacy'))
        router.refresh()
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
                setCurrentValue(privacy)
                setIsValid(false)
            }, 1000)
        }
    }, [isOpen])


    return (
        <Modal id={'changeCollectionPrivacy'}>
            <div>
                <h1 className='font-semibold text-h6'>Gerir privacidade da coleção</h1>
                <p className='text-secondary'>Decide quem tem acesso a esta coleção.</p>
            </div>

            <fieldset className="flex flex-col sm:flex-row gap-4">

                <input className="invisible absolute" onClick={e => handlePrivacyChange(e)} type="radio" id="public" name="privacy" value={2} defaultChecked={privacy === 2} />
                <label className={`${currentValue == 2 ? 'bg-primary_light bg-opacity-50 border-primary_main' : 'border-grey'} w-full py-3 px-3 border rounded cursor-pointer font-medium mb-0.5`} for="public">
                    Pública
                    <p className='text-secondary text-caption font-normal'>Todas as pessoas podem ver a tua coleção.</p>
                </label>


                <input className="invisible absolute" onClick={e => handlePrivacyChange(e)} type="radio" id="private" name="privacy" value={1} defaultChecked={privacy === 1} />
                <label className={`${currentValue == 1 ? 'bg-primary_light bg-opacity-50 border-primary_main' : 'border-grey'} w-full py-3 px-3 border rounded cursor-pointer font-medium mb-0.5`} for="private">
                    Privada
                    <p className='text-secondary text-caption font-normal'>Apenas tu e pessoas que fazem parte da tua coleção.</p>
                </label>

            </fieldset>

            <button
                disabled={!isValid}
                onClick={updatePrivacy}
                className={`bg-dark w-full text-white font-semibold px-9 py-3.5 rounded ${!isValid && 'opacity-30 cursor-not-allowed'} `}>
                Alterar privacidade
            </button>
        </Modal >
    )
}

export default UpdateCollectionPrivacyModal