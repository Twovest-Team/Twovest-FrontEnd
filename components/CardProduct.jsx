import Link from 'next/link'
import Image from 'next/image';
import { categories } from '@/constants';
import FavoriteButton from './FavoriteButton';
import PriceIntervalCardProduct from './PriceIntervalCardProduct';

const CardProduct = ({ product }) => {

    
    const categoryName = categories.find(element => element.id === product.categories.id).singular

    return (
        <article className='w-full max-w-[460px] flex-5'>
           
            <div className='w-full rounded border-grey border aspect-square relative flex justify-center items-center'>

                <Link href={`/product/mulher/${product.id}`}>
                <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill={true}
                />
                </Link>
                
                <div className='absolute top-2.5 px-4 w-full flex items-center justify-between'>
                    <Link href={`/brands/mulher/${product.brands.name}`}>
                        <Image
                            src={product.brands.logo_url}
                            width={30}
                            height={30}
                            alt={product.brands.name}
                            className='rounded-full shadow-lg'
                        />
                    </Link>

                    <FavoriteButton />
                </div>


            </div>
            <div className='flex flex-wrap justify-between items-center mt-2.5 gap-y-1'>
                <p className='truncate font-semibold w-40'>{categoryName} {product.brands.name}</p>
                <PriceIntervalCardProduct offers={product.offers} />
            </div>
        </article>


    )
}

export default CardProduct





