// Página do perfil da marca
// Exemplo: twovest.com/brands
import getBrands from "@/utils/db/getBrands"

import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image'
export const revalidate = 0;
const Brands = async () => {
  
  const brand = await getBrands();
  console.log(brand);
  return (
    <>
    <div className="flex justify-between w-full px-4 py-4 bg-white relative">
    
      <div className="absolute inset-y-0 left-0 flex items-center pl-10">
        <SearchIcon className="w-6 h-6 text-gray-500" />
      </div>
      <input
        type="text"
        className="pl-16 w-full h-20 border rounded"
        placeholder="Pesquisa"
      />
    </div>
    
    <div className=" grid grid-cols-2 mx-4 mb-4 justify-between">
        <div className="  mt-4 py-16 mr-2  bg-white h-40 w-auto rounded flex flex-col items-center justify-center border ">
        <Image  src={brand[0]?.logo_url_without_background} width={80} height={40} alt={brand[0].name} />

      
         
        </div>
        <div className=" mt-4 py-16 ml-2 bg-white h-40 w-auto rounded flex flex-col items-center justify-center border ">
        <Image  src={brand[1]?.logo_url_without_background} width={80} height={40} alt={brand[1].name} />
        </div>
   
        
    </div>

        
    
    <div className=" grid grid-cols-2 mx-4 mb-4 justify-between">
  <p className="text-center">{brand[0].name}</p>
  <p className="text-center">{brand[1].name}</p>
</div>

<div className=" grid grid-cols-2 mx-4 mb-4 justify-between">
        <div className="  mt-4 py-16 mr-2  bg-white h-40 w-auto rounded flex flex-col  items-center justify-center border">
        <Image  src={brand[2]?.logo_url_without_background} width={80} height={40} alt={brand[2].name} />
        </div>
        <div className=" mt-4 py-16 ml-2 bg-white h-40 w-auto rounded flex flex-col  items-center justify-center border ">
        <Image  src={brand[3]?.logo_url_without_background} width={80} height={40} alt={brand[3].name} />
        </div>
        
    </div>

    <div className=" grid grid-cols-2 mx-4 mb-4 justify-between">
  <p className="text-center">{brand[2].name}</p>
  <p className="text-center">{brand[3].name}</p>
</div>

<div className=" grid grid-cols-2 mx-4 mb-4 justify-between">
        <div className="  mt-4 py-16 mr-2  bg-white h-40 w-auto rounded flex flex-col items-center justify-center border ">
        <Image  src={brand[4]?.logo_url_without_background} width={80} height={40} alt={brand[4].name} />
        </div>
        <div className=" mt-4 py-16 ml-2 bg-white h-40 w-auto rounded flex flex-col  items-center justify-center border ">
        <Image  src={brand[5]?.logo_url_without_background} width={80} height={40} alt={brand[5].name} />
        </div>
        
    </div>

    <div className=" grid grid-cols-2 mx-4 mb-4 justify-between">
    <p className="text-center">{brand[4].name}</p>
  <p className="text-center">{brand[5].name}</p>
</div>

<div className=" grid grid-cols-2 mx-4 mb-4 justify-between">
        <div className="  mt-4 py-16 mr-2  bg-white h-40 w-auto rounded flex flex-col  items-center justify-center border ">
        <Image  src={brand[6]?.logo_url_without_background} width={80} height={40} alt={brand[6].name} />
        </div>
        <div className=" mt-4 py-16 ml-2 bg-white h-40 w-auto rounded flex flex-col  items-center justify-center border ">
        <Image  src={brand[7]?.logo_url_without_background} width={80} height={40} alt={brand[7].name} />
        </div>
        
    </div>

    <div className=" grid grid-cols-2 mx-4  justify-between">
    <p className="text-center">{brand[6].name}</p>
  <p className="text-center">{brand[7].name}</p>
</div>
<div className=" grid grid-cols-2 mx-4 mb-4 justify-between">
        <div className="  mt-4 py-16 mr-2  bg-white h-40 w-auto rounded flex flex-col  items-center justify-center border ">
        <Image  src={brand[8]?.logo_url_without_background} width={80} height={40} alt={brand[8].name} />
        </div>
        <div className=" mt-4 py-16 ml-2 bg-white h-40 w-auto rounded flex flex-col  items-center justify-center border ">
        <Image  src={brand[9]?.logo_url_without_background} width={80} height={40} alt={brand[9].name} />
        </div>
        
    </div>

    <div className=" grid grid-cols-2 mx-4 mb-10 justify-between">
    <p className="text-center">{brand[8].name}</p>
    <p className="text-center">{brand[9].name}</p>
</div>
    </>
    
  );
};

export default Brands;