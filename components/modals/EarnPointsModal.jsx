'use client'

import { useAppDispatch } from '@/redux/hooks'
import Modal from './Modal'
import { closeModal, openModal } from '@/redux/slices/modalSlice'
import Button from '../buttons/Button'
import Image from 'next/image'
import IconButton from '../buttons/icons/IconButton'
import AutoModeIcon from "@mui/icons-material/AutoMode";

const EarnPointsModal = () => {

    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(openModal('galleryPointsModal'))
    }

    const handleClose = () => {
        dispatch(closeModal('galleryPointsModal'))
    }

    return (
        <>

            <div className='sm:hidden'>
                <IconButton
                    onClick={handleClick}
                    icon={<AutoModeIcon sx={{ fontSize: 24 }} />}
                />
            </div>

            <button onClick={handleClick}
                className='hidden bg-black hover:bg-dark_gray text-white sm:flex  transition-all duration-200 px-5 py-2 rounded-full caption gap-2 items-center font-semibold'>
                <AutoModeIcon sx={{fontSize: 20}} />
                <span className='pt-0.5'>Ganhar pontos</span>
            </button>

            <Modal fullScreenMobile={true} noPadding={true} id={'galleryPointsModal'}>

                <div className='h-full flex flex-col'>
                    <figure className='w-full flex-grow sm:flex-auto sm:h-[485px] relative'>
                        <Image className='object-cover object-bottom rounded-t' fill={true} src={'/static/images/modals/gallery/earn_points_modal.webp'} alt='Imagem de ilustração de como ganhar pontos na galeria.' />
                    </figure>

                    <div className='pb-8 pt-5 flex flex-col gap-6 container'>
                        <div>
                            <h1 className="text_h5 mb-2">Ganha pontos com os teus looks</h1>
                            <p className="text-secondary caption sm:text-base">Cada peça da Twovest dos teus looks equivale a 5 pontos que podes utilizar para debloquear novos cupões. A cada 10 upvotes de utilizadores que já efetuaram pelo menos uma compra na Twovest também ganhas 5 pontos.</p>
                        </div>

                        <Button onClick={handleClose} width='100%' type='black' ariaLabel='Submeter um look' href='/gallery/submitLook'>
                            {'Submeter um look'}
                        </Button>
                    </div>
                </div>


            </Modal>
        </>

    )
}

export default EarnPointsModal