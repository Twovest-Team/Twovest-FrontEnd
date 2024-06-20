'use client'

import useAuth from '@/hooks/client-hooks/useAuth'
import Button from './Button'
import { useAppDispatch } from '@/redux/hooks'
import { openModal } from '@/redux/slices/modalSlice'
import AuthModal from '../modals/AuthModal'
import { useRouter } from 'next/navigation'

const SubmitLookButton = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const {currentUser} = useAuth();

    const handleClick = () => {
        if(!currentUser) dispatch(openModal('authModal'))
        if(currentUser) router.push('/gallery/submitLook');
    }

    return (
        <Button
            onClick={handleClick}
            type={"primary"}
            ariaLabel="Submeter look"
        >
            Submeter look
        </Button>
    )
}

export default SubmitLookButton