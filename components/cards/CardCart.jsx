
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Image from 'next/image';
import ProductQuantityControl from '../items/ProductQuantityControl';
import DeleteButton from '../buttons/icons/DeleteButton';

export const CardCart = () => {
    return (
        <article className='py-12 border-b border-grey'>
            <div className="flex self-center items-center w-full">

                <figure className="bg-white border min-w-[115px] aspect-square border-grey rounded relative">
                    <Image src={"https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/product_images/image_1.png"} width={115} height={115} alt='produto' />

                    <div className='absolute top-0 right-0 min-[350px]:hidden'>
                        <DeleteButton />
                    </div>
                </figure>

                <div className='min-h-[115px] flex justify-between flex-grow min-w-0'>
                    <div className="ml-4 flex flex-col font-semibold justify-between min-w-0 flex-grow ">
                        <div className='flex flex-col gap-1'>

                            <div className='flex justify-between gap-2'>
                                <p className='truncate'>Camisolaa asdasd </p>
                                <div className='hidden min-[350px]:block'>
                                    <DeleteButton />
                                </div>
                            </div>

                            <p className="text-primary_main caption">Novo</p>
                            <p className="text-secondary caption">XS</p>
                        </div>

                        <div className='flex justify-between'>
                            <p className="font-semibold h-8 flex items-center">1000.00€</p>
                            <div className='hidden min-[350px]:block'>
                                <ProductQuantityControl />
                            </div>
                        </div>

                    </div>

                </div>


            </div>


            <div className='flex justify-between items-center mt-2 h-full gap-4 min-[350px]:hidden'>
                <div className='w-[115px]'>
                    <ProductQuantityControl />
                </div>

            </div>

        </article>
    )
}