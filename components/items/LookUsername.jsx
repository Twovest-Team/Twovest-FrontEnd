'use client'

import { useAppSelector } from '@/redux/hooks';

//Serve para apenas mostrar o nome do utilizador na card de galeria se estiver em modo de visualização 1 coluna

export default function LookUsername({ slider, username }) {

    // const currentView = useAppSelector(state => state.layoutViews.currentValue)

    return (
        <p className={`text-caption font-light truncate`}>
            {username}
        </p>
    )

}