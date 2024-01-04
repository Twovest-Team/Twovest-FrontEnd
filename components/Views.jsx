'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateView } from '@/redux/slices/layoutViews';
import CropSquareIcon from '@mui/icons-material/CropSquare';

const Views = () => {

    const dispatch = useAppDispatch()
    const currentView = useAppSelector(state => state.layoutViews.currentValue)

    function handleViewChange(viewNumber) {
        dispatch(updateView(viewNumber))
    }

    const icon = <CropSquareIcon sx={{ fontSize: 28 }} />


    return (
        <div className="flex items-center justify-between gap-2 text-secondary w-fit">

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