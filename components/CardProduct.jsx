import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';
import { categories } from '@/constants';

const CardProduct = ({ product }) => {

    let customStyles;

    //   switch(view){
    //     case 'singular':
    //         break;
    //         case 'pairs':
    //             break;
    //   }

    // console.log(product)
    const priceInterval = findMinMaxPrices(product.offers);
    console.log(priceInterval);

    return (
        <article className='w-full max-w-[340px]'>
            <Link href={'#'} className='w-full border rounded border-grey aspect-square relative flex justify-center items-center'>

                <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill={true}
                />


                <FavoriteBorderIcon className='absolute top-2.5 right-2.5' />

                <Image
                    src={product.brands.logo_url}
                    width={12}
                    height={12}
                    alt={product.brands.name}
                    className='rounded-full absolute top-2.5 left-2.5'
                />

            </Link>
            <div className='flex justify-between items-center mt-2.5 font-semibold'>
                <p className=''>{product.brands.name} {}</p>
                <p>{priceInterval.minPrice}€ - {priceInterval.maxPrice}€</p>
            </div>
        </article>


    )
}

export default CardProduct

function findMinMaxPrices(offers) {
    if (!offers || !Array.isArray(offers) || offers.length === 0) {
        return null; // Return null for invalid input
    }

    let minPrice = Number.POSITIVE_INFINITY;
    let maxPrice = Number.NEGATIVE_INFINITY;

    for (const offer of offers) {
        if (offer.price < minPrice) {
            minPrice = offer.price;
        }

        if (offer.price > maxPrice) {
            maxPrice = offer.price;
        }
    }

    return { minPrice, maxPrice };
}




