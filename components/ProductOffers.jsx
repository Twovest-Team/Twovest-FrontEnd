import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProductOfferCard from './ProductOfferCard';


const ProductOffers = ({ offers, discount }) => {

    const sortedOffers = sortOffers(offers)
    const bestOffers = getBestOffers(sortedOffers)


    return (
        <div className="container flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h6 className="font-semibold">{offers.length > 3 ? 'Melhores ofertas' : 'Ofertas'}</h6>
                <p className="text-secondary">{bestOffers.length} {offers.length > 1 ? `de ${offers.length} ofertas` : 'oferta no total'}
                </p>
            </div>

            <div className="flex gap-3">
                <button className="w-1/2 text-left px-6 py-4 border border-grey rounded flex items-end justify-between">
                    Cor
                    <KeyboardArrowDownIcon />
                </button>

                <button className="w-1/2 text-left px-6 py-4 border border-grey rounded flex items-end justify-between">
                    Tamanho
                    <KeyboardArrowDownIcon />
                </button>
            </div>

            <div className='flex flex-col gap-6'>
                {bestOffers.map((offer, index) => <ProductOfferCard key={index} offer={offer} discount={discount} />)}
            </div>

            {offers.length > 2 &&
                <button className="bg-dark hover:bg-dark_gray text-center text-white w-full py-3.5 font-semibold rounded">
                    Ver todas as ofertas
                </button>
            }


        </div>
    )
}

const sortOffers = (offers) => {
    return offers.sort((a, b) => {
        // First, sort by condition
        if (a.conditions.id !== b.conditions.id) {
            return a.conditions.id - b.conditions.id;
        }

        // If conditions are the same, then sort by price
        return a.price - b.price;
    })
}

const getBestOffers = (offers) => {

    const bestOffers = [];
    let totalBestOffers;

    if (offers.length >= 2) {
        totalBestOffers = 2
    } else {
        totalBestOffers = offers.length
    }

    for (let i = 0; i < totalBestOffers; i++) {
        bestOffers.push(offers[i])
    }

    return bestOffers
}


export default ProductOffers



