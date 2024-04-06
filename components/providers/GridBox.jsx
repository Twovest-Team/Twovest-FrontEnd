'use client'

import { useEffect, useState } from "react"
import { useAppSelector } from '@/redux/hooks';


const GridBox = ({ children, loader, fixed }) => {


    let cols;
    const currentView = useAppSelector(state => state.layoutViews.currentValue)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])


    if (currentView) {
        switch (currentView) {
            case 1: cols = 'grid-cols-1'
            case 2: cols = 'grid-cols-2'
            case 3: cols = 'grid-cols-3'
            case 4: cols = 'grid-cols-4'
            case 5: cols = 'grid-cols-5'
        }
    }

    if (!currentView) cols = 'max-[350px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

    return (
        <div className={`container w-full grid ${cols} gap-3`}>
            {!loading ? children : loader}
        </div>
    )
}

export default GridBox