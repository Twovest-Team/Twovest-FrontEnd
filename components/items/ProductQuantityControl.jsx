import { productMaxQty } from '@/constants';
import { useAppDispatch } from '@/redux/hooks';
import { updateCart } from '@/redux/slices/cartProducts';
import updateCartProductQty from '@/utils/db/cart/updateCartProductQty';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductQuantityControl = ({ cartId, qty, userEmail, handleLoading }) => {

    const dispatch = useAppDispatch()

    async function handleQtyChange(num) {
        const updatedQty = qty + num

        if (updatedQty <= productMaxQty) {

            handleLoading(true)
            let updatedCart;

            if (num > 0) {
                updatedCart = await updateCartProductQty(cartId, userEmail, qty, '+')
            } else if (num < 0) {
                updatedCart = await updateCartProductQty(cartId, userEmail, qty, '-')
            }

            if (updatedCart) {
                dispatch(updateCart(updatedCart))
               handleLoading(false)
            }

        }
    }

    return (
        <div className="flex items-center gap-4 border px-1.5 py-1 h-8 border-grey rounded bg-white">
            <button
                onClick={() => handleQtyChange(-1)}
                className={`flex items-center`}
                type="button"
                id="decrement-button"
                >
                <RemoveIcon className='text-[15px]' />
            </button>

            <p className="text-center text-black font-semibold w-full caption">{qty}</p>

            <button
                disabled={qty === 10 && true}
                onClick={() => handleQtyChange(1)}
                className={`flex items-center ${qty === 10 && 'invisible'}`}
                type="button"
                id="increment-button"
                >
                <AddIcon className='text-[15px]' />
            </button>
        </div>
    )
}

export default ProductQuantityControl