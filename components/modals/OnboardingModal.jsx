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
        <Modal
            bgSize={'100% 80%'}
            bgPosition={'top'}
            bgImage={currentSection.img}
            noPadding={true}
            size='md'
            id='onboardingModal'
            darkMode={true}
            onClose={() => router.push(pathname)}
        >
            <>
                <div className="h-[80vh] average:h-[550px] relative">
                    <div className="flex flex-col gap-8 justify-between bg-white h-[270px] sm:h-[250px] container py-7 rounded-b absolute bottom-0">
                        <div className="flex flex-col gap-2">
                            <h1 className="text_h5">{currentSection.title}</h1>
                            <p className="text-secondary">{currentSection.text}</p>
                        </div>


                        <div className="text-white flex justify-between items-center">
                            {currentSection.id === 0 &&
                                <Button className="ml-auto" type="primary" ariaLabel="Começar onboarding." onClick={next}>{'Começar ->'}</Button>
                            }

                            {currentSection.id >= 1 && (currentSection.id + 1) < onboardingData.length && (
                                <>
                                    <button className="rounded-full border border-primary_main w-12 h-12 flex items-center justify-center text-primary_main" onClick={back}>
                                        <ArrowBackIcon />
                                    </button>
                                    <button className="rounded-full border-primary_main bg-primary_main w-12 h-12 flex items-center justify-center " onClick={next}>
                                        <ArrowForwardIcon />
                                    </button>
                                </>
                            )}

                            {(currentSection.id + 1) === onboardingData.length && (
                                <>
                                    <button className="rounded-full border border-primary_main w-12 h-12 flex items-center justify-center text-primary_main" onClick={back}>
                                        <ArrowBackIcon />
                                    </button>
                                    <Button className="ml-auto" type="primary" ariaLabel="Começar onboarding." onClick={next}>{'Concluir ->'}</Button>
                                </>

                            )}
                        </div>

                    </div>

                </div>

            </>
        </Modal>
    )
}

export default OnboardingModal
