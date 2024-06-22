'use client'

import { useEffect, useState } from "react"
import { useAppSelector } from '@/redux/hooks';

const GridBox = ({ children, loader, fixed, restrictedTo, noContainer }) => {

    const getDefaultCols = () => {
        if (!restrictedTo) return `max-[390px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
        switch (restrictedTo) {
            case 1: return 'grid-cols-1'
            case 2: return 'grid-cols-2'
            case 3: return 'grid-cols-3'
            case 4: return 'grid-cols-4'
            case 5: return 'grid-cols-5'
        }
    }

    const [cols, setCols] = useState(getDefaultCols());
    const currentView = useAppSelector(state => state.layoutViews.currentValue)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        if (currentView && !fixed && !restrictedTo) {
            switch (currentView) {
                case 1: setCols('grid-cols-1')
                    break;
                case 2: setCols('grid-cols-2')
                    break;
                case 3: setCols('grid-cols-3')
                    break;
                case 4: setCols('grid-cols-4')
                    break;
                case 5: setCols('grid-cols-5')
                    break;
            }
        }

    }, [currentView])


    return (
        <div className={`${!noContainer ? 'container mb-20' : ''} w-full grid ${cols} gap-3`}>
            {!loading ? children : loader}
        </div>
    )
}

export default GridBox