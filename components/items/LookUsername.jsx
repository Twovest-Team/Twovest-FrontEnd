'use client'

import { useAppSelector } from '@/redux/hooks';

//Serve para apenas mostrar o nome do utilizador na card de galeria se estiver em modo de visualização 1 coluna

export default function LookUsername (props) {

    const currentView = useAppSelector(state => state.layoutViews.currentValue)

    return(
        <p className={`caption font-light ${!currentView || currentView === 1 ? 'visible' : currentView === 2 && 'hidden'} `}>{props.username}</p>
    )

}