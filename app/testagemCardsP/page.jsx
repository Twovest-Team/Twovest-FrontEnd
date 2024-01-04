import CardProduct from '@/components/CardProduct';
import getProductsByCategory from '@/utils/db/getProductsByCategory';


const Page = async () => {

    const data = await getProductsByCategory(13, 'Mulher')

    data.map(element => console.log(element))

    return (

        <div className='my-20 flex justify-center flex-col items-center gap-5 container'>
            {data.map(element => <CardProduct product={element} />)}
        </div>

    )
}

export default Page