'use client'

import { useAppSelector } from '@/redux/hooks';
import findProductMinMaxPrices from '@/utils/findProductMinMaxPrices';

const PriceProduct = ({ discount, offers }) => {

    const currentView = useAppSelector(state => state.layoutViews.currentValue)
    console.log(offers)
    let priceInterval;
    if (offers.length > 1) {
        priceInterval = findProductMinMaxPrices(offers);
    }

    return (
        <p
            className={`font-medium truncate w-44
            ${currentView === 1 ? 'text-right max-[383px]:text-left' : currentView === 2 && 'text-left caption'}
            `}>
            {priceInterval ?
                <span>{priceInterval.minPrice}€ - {priceInterval.maxPrice}€</span> :
                <>
                    {discount > 0 &&
                        <><span className='text-secondary line-through'>{offers[0].price}€</span> {offers[0].price}€</>
                    }
                </>
            }
        </p>
    )
}

export default PriceProduct