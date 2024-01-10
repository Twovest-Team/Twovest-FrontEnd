import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductQuantityControl = () => {
    return (
        <div className="flex items-center gap-4 border px-1.5 py-1 h-8 border-grey rounded bg-white">
            <button className='flex items-center' type="button" id="decrement-button">
                <RemoveIcon className='text-[15px]' />
            </button>

            <p className="text-center text-black font-semibold w-full caption">1</p>

            <button className='flex items-center' type="button" id="increment-button">
                <AddIcon className='text-[15px]' />
            </button>
        </div>
    )
}

export default ProductQuantityControl