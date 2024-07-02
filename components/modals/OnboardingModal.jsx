'use client'

import { usePathname, useSearchParams } from "next/navigation"
import Modal from "./Modal"
import { useAppDispatch } from "@/redux/hooks"
import { closeModal, openModal } from "@/redux/slices/modalSlice"
import { useEffect, useState } from "react"
import { onboardingData } from "@/constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "../buttons/Button"
import { useRouter } from "next/navigation"
import Image from "next/image"

const OnboardingModal = () => {

    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const onboarding = searchParams.get('onboarding')
    const router = useRouter();
    const pathname = usePathname();

    const [currentSection, setCurrentSection] = useState(onboardingData[0]);

    const next = () => {
        if ((currentSection.id + 1) < onboardingData.length) {
            setCurrentSection((prev) => onboardingData[prev.id + 1]);
        } else {
            router.push(pathname)
            dispatch(closeModal('onboardingModal'))
        }
    };

    const back = () => {
        setCurrentSection((prev) => prev.id > 0 ? onboardingData[prev.id - 1] : prev);
    };

    useEffect(() => {
        if (onboarding) dispatch(openModal('onboardingModal'))
    }, [])


    return (
        <Modal onClose={() => router.push(pathname)} size={'sm'} fullScreenMobile={true} noPadding={true} id={'onboardingModal'}>

            <div className='h-full flex flex-col'>
                <figure className='w-full flex-grow sm:flex-auto sm:h-[340px] relative'>
                    <Image priority={true} quality={100} className='object-cover object-bottom sm:object-top rounded-t' fill={true} src={`/static/images/modals/onboarding/${currentSection.img}`} alt='Imagem de ilustração de como ganhar pontos na galeria.' />
                </figure>

                <div className='pb-8 pt-5 flex flex-col gap-6 container'>
                    <div>
                        <h1 className="text-h5 mb-2">{currentSection.title}</h1>
                        <p className="text-secondary text-caption sm:text-base">{currentSection.text}</p>
                    </div>

                    <div className="text-white flex justify-between items-center h-14">
                        {currentSection.id === 0 &&
                            <Button width="100%" className="ml-auto" type="black" ariaLabel="Começar onboarding." onClick={next}>{'Começar ->'}</Button>
                        }

                        {currentSection.id >= 1 && (currentSection.id + 1) < onboardingData.length && (
                            <>
                                <button className="rounded-full border border-black hover:bg-black hover:text-white transition-colors duration-200 w-12 h-12 flex items-center justify-center text-black" onClick={back}>
                                    <ArrowBackIcon />
                                </button>
                                <button className="rounded-full border-black hover:bg-dark_gray transition-colors duration-200 bg-black w-12 h-12 flex items-center justify-center " onClick={next}>
                                    <ArrowForwardIcon />
                                </button>
                            </>
                        )}
                        {(currentSection.id + 1) === onboardingData.length && (
                            <>
                                <button className="rounded-full border border-black w-12 h-12 flex items-center justify-center text-black" onClick={back}>
                                    <ArrowBackIcon />
                                </button>
                                <Button className="ml-auto" type="black" ariaLabel="Começar onboarding." onClick={next}>{'Concluir ->'}</Button>
                            </>

                        )}
                    </div>
                </div>
            </div>


        </Modal>
    )
}

export default OnboardingModal
