import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Image from 'next/image';

export const CardCart = () =>{
    return(
        <div className="flex self-center items-center">
               <div className="bg-white border-2 border-grey my-4 rounded mr-2">
                    <Image src={"https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/product_images/image_1.png"} width={180} height={180} alt='produto'/>
                </div> 
               <div className="w-full">
                <div className="font-semibold caption flex justify-between">
                    <div className="caption">Camisola Angola</div><DeleteOutlineIcon className="text-[18px] text-secondary cursor-pointer"></DeleteOutlineIcon>
                </div>
                <div className="text-primary_main caption">Novo</div>
                <div className="text-secondary caption">XS</div>
                <div className="flex items-center justify-between">
                    <div className="font-semibold mt-2">1000.00€</div>



                    <div className="flex items-center min-[310px]:max-w-[4.5rem] max-w-[3.7rem] mt-2 border px-1.5 py-1 border-grey rounded">
                        <button type="button" id="decrement-button">
                            <RemoveIcon className='text-[15px]'/>
                        </button>

                        <input type="number" className="text-center text-black font-semibold w-full"  placeholder="1" required/>

                        <button type="button" id="increment-button">
                            <AddIcon className='text-[15px]'/>
                        </button>
                    </div>

                </div>
                
                </div>
        </div> 
    )
}