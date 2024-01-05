'use client'

import { useAppSelector } from '@/redux/hooks';
import findProductMinMaxPrices from '@/utils/findProductMinMaxPrices';

const PriceIntervalCardProduct = ({ offers }) => {

    const currentView = useAppSelector(state => state.layoutViews.currentValue)
    const priceInterval = findProductMinMaxPrices(offers);

    return (
        <p
            className={`font-medium truncate w-44
            ${currentView === 1 ? 'text-right max-[383px]:text-left' : currentView === 2 && 'text-left caption'}
            `}>
            {priceInterval.minPrice}€ - {priceInterval.maxPrice}€
        </p>
    )
}

export default PriceIntervalCardProduct