import React from 'react'
import BuyButton from '../buttons/icons/BuyButton';
import applyPriceDiscount from '@/utils/applyPriceDiscount';

const ProductOfferCard = ({ offer, discount }) => {

    let color;

    switch (offer.conditions.id) {
        case 1:
            color = 'bg-primary_main'
            break;
        case 2:
            color = 'bg-info_main'
            break;
        case 3:
            color = 'bg-warning_main'
            break;
    }

    return (
        <article className='font-semibold flex flex-col gap-5 py-7 border border-grey rounded px-6'>
            <article className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <div className={`w-3 h-3 ${color} rounded-full`}></div>
                    <p>{offer.conditions.name}</p>
                </div>

                <div className='flex gap-2'>
                    {discount > 0 &&
                    <p className='text-secondary line-through'>{offer.price.toFixed(2)}€</p>
                    }
                    <p>{applyPriceDiscount(offer.price, discount)}€</p>
                </div>
            </article>

            <div className='flex justify-between items-center'>
                <div className='flex flex-wrap gap-3'>
                    <article className='text-secondary border caption border-grey rounded px-3 py-2 flex items-center font-normal w-fit'>
                        Tamanho: {offer.sizes.size}
                    </article>

                    <article className='text-secondary border caption border-grey rounded px-3 py-2 flex items-center font-normal w-fit'>
                        {offer.colors.name}
                    </article>
                </div>


                <BuyButton />

            </div>



        </article>
    )
}

export default ProductOfferCard