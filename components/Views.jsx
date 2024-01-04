'use client'

import CropSquareIcon from '@mui/icons-material/CropSquare';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Views = () => {

    const searchParams = useSearchParams()
    
    console.log(searchParams.get('view'))
    const [currentView, setCurrentView] = useState(searchParams.get('view') ? parseInt(searchParams.get('view')) : 1)


    const router = useRouter()
    const icon = <CropSquareIcon sx={{ fontSize: 28 }} />

    function handleViewChange(view) {
        setCurrentView(view)
        router.push(`?view=${view}`, { scroll: false })
    }

    return (
        <div className="flex items-center justify-between gap-2 text-secondary w-fit">

            <button
                disabled={currentView === 1 ? true : false}
                className={`text-${currentView === 1 ? 'dark' : 'secondary'}`}
                onClick={() => handleViewChange(1)}
            >
                {icon}
            </button>

            <button
                disabled={currentView === 2 ? true : false}
                className={`relative text-${currentView === 2 ? 'dark' : 'secondary'}`}
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