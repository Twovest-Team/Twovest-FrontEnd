'use client'

import { useEffect, useState } from "react"
import { useAppSelector } from '@/redux/hooks';


const GridBox = ({ children, loader, fixed }) => {


    const [cols, setCols] = useState('max-[350px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4');
    const currentView = useAppSelector(state => state.layoutViews.currentValue)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        if (currentView && !fixed) {
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
        <div className={`container w-full grid ${cols} gap-3 mb-20`}>
            {!loading ? children : loader}
        </div>
    )
}

export default GridBox