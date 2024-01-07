'use client'

import { useAppSelector } from '@/redux/hooks';
import findProductMinMaxPrices from '@/utils/findProductMinMaxPrices';
import applyPriceDiscount from '@/utils/applyPriceDiscount';

const PriceProduct = ({ discount, offers }) => {

    const currentView = useAppSelector(state => state.layoutViews.currentValue)
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

                <>
                    {discount > 0 ?
                        <span>{applyPriceDiscount(priceInterval.minPrice, discount)}€ - {applyPriceDiscount(priceInterval.maxPrice, discount)}€</span>
                        :
                        <span>{priceInterval.minPrice.toFixed(2)}€ - {priceInterval.maxPrice.toFixed(2)}€</span>
                    }

                </>


                :
                <>
                    {discount > 0 ?
                        <><span className='text-secondary line-through'>{offers[0].price}€</span> {applyPriceDiscount(offers[0].price, discount)}€</> :
                        <span>{offers[0].price}€</span>
                    }
                </>
            }
        </p>
    )
}

export default PriceProduct