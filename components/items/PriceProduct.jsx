
import { getBestOffer } from '@/utils/handlers/handleOffers';
import { applyPriceDiscount, formatPrice } from '@/utils/handlers/handlePricing';

const PriceProduct = ({ discount, offers }) => {

    const bestOffer = getBestOffer(offers)
    const discountedPrice = (price) => applyPriceDiscount(price, discount) + '€';

    return (
        <p className='font-medium w-full caption'>
            {discount > 0
                ? <><span className='text-secondary line-through'>{formatPrice(bestOffer.price)}</span> {discountedPrice(bestOffer.price)}</>
                : formatPrice(bestOffer.price)}
        </p>
    )
};

export default PriceProduct;
