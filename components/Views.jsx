'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateView } from '@/redux/slices/layoutViews';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { useEffect, useState } from 'react';

const Views = () => {

    const dispatch = useAppDispatch() // Para atualizar o state da view
    const currentView = useAppSelector(state => state.layoutViews.currentValue) // Para ver o state da view atual
    const [windowWidth, setWindowWidth] = useState('') // Para verificar a width da Window
    const minDisplayWidth = 335  // Tamanho minimo para fazer display do componente
    const icon = <CropSquareIcon sx={{ fontSize: 28 }} />

    function handleViewChange(viewNumber) {
        dispatch(updateView(viewNumber))
    }

    useEffect(() => {

        setWindowWidth(window.innerWidth)

        const onResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);


    useEffect(() => {
        if (windowWidth <= minDisplayWidth) {
            handleViewChange(1)
        }
    }, [windowWidth])


    return (
        <div className={`flex items-center justify-between gap-2 text-secondary w-fit views_div-display`}>

            <button
                disabled={currentView === 1 ? true : false}
                className={`${currentView === 1 ? 'text-dark' : 'text-secondary'}`}
                onClick={() => handleViewChange(1)}
            >
                {icon}
            </button>

            <button
                disabled={currentView === 2 ? true : false}
                className={`relative ${currentView === 2 ? 'text-dark' : 'text-secondary'}`}
                onClick={() => handleViewChange(2)}
            >
                {icon}

                <div
                    className={`w-[2.4px] h-[18px] absolute top-[5px] left-1/2 -translate-x-1/2 ${currentView === 2 ? 'bg-dark' : 'bg-secondary'}`}>
                </div>

            </button>
        </div>
    )
}

export default Views