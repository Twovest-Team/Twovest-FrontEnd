'use client'

import Modal from './Modal';
import coloredGoogleIcon from "@/public/static/images/login/google_logo.svg";
import coloredFacebookIcon from "@/public/static/images/login/facebook_logo.svg";
import coloredAppleIcon from "@/public/static/images/login/apple_logo_black.svg";
import Image from 'next/image';
import Button from '../buttons/Button';
import Link from 'next/link';
import handleProviders from '@/utils/handlers/handleProviders';
import { closeModal } from '@/redux/slices/modalSlice';
import { useAppDispatch } from '@/redux/hooks';

const AuthModal = () => {

    const dispatch = useAppDispatch()

    const handleClick = (provider) => {
        handleProviders(provider)
        closeModal('authModal')
    }
    
    return (
        <Modal id='authModal'>
            <div className='flex flex-col justify-center sm:items-center gap-8 sm:mx-5 average:mb-5'>
                <div className='flex flex-col gap-1 items-center'>
                    <h1 className='sm:hidden text-h5 pt-3 sm:pt-0'>Iniciar sessão na Twovest</h1>
                    <h1 className='hidden sm:block text-h4 text-center'>Iniciar sessão na Twovest</h1>
                    <p className='text-secondary text-center'>Desfruta de todas as vantagens.</p>
                </div>

                <div className='w-full flex flex-col gap-10'>
                    
                    <div className='flex flex-col gap-4'>
                    {[
                        {
                            provider: 'Google',
                            src: coloredGoogleIcon,
                            height: 22,
                            width: 22
                        },
                        {
                            provider: 'Facebook',
                            src: coloredFacebookIcon,
                            height: 24,
                            width: 24
                        },
                        {
                            provider: 'Apple',
                            src: coloredAppleIcon,
                            height: 22,
                            width: 22
                        }
                    ].map((props, index) => (
                        <Button
                            key={index}
                            className='border border-grey'
                            type='white'
                            ariaLabel={`Continuar com ${props.provider}`}
                            width='100%'
                            onClick={() => handleClick(props.provider)}
                        >
                            <Image
                                src={props.src}
                                height={props.height}
                                width={props.width}
                                alt=''
                                className='mr-1'
                            />
                            <span className='hidden [@media(min-width:360px)]:inline'>Continuar com</span> {props.provider}
                        </Button>
                    ))}
                    </div>
                  

                    <div className='flex items-center w-full'>
                        <div className='border-b border-grey w-full'></div>
                        <div className='font-semibold mx-4'>Ou</div>
                        <div className='border-b border-grey w-full'></div>
                    </div>

                    <div className='flex flex-col items-center gap-5'>
                        <p className='text-center'>
                            Se já tens conta, <Link onClick={() => dispatch(closeModal('authModal'))} href='/login' className='font-semibold underline'>inicia sessão.</Link>
                        </p>
                        <p className='flex flex-wrap justify-center gap-1'>
                            Não tens conta? <Link onClick={() => dispatch(closeModal('authModal'))} href='/register' className='font-semibold underline'>Regista-te com o teu email.</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AuthModal;
