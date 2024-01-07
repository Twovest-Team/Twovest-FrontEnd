// Página do perfil da marca
// Exemplo: twovest.com/brands
import brands from "@/utils/db/getBrands";
import SearchIcon from '@mui/icons-material/Search';

import Image from 'next/image'
import Link from 'next/link';
export const revalidate = 100;
const Brands = async () => {
 
  const brand = await brands();

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
    
   

        
    <div className="grid grid-cols-2  mb-4 justify-between">
        {brand.map((brand, index) => (
            <div key={index} className="flex flex-col items-center justify-between mx-3">
          <div  className={`mt-4 w-full h-48  bg-white rounded flex items-center justify-center border `}>
          <Link href={`/brands/mulher/${brand.name}`}>
            
            <Image src={brand?.logo_url_without_background} width={144} height={144} alt={brand.name} />
           
            </Link>
          </div>
          <p key={index} className="grid mt-4 justify-center text-center mb-6">{brand.name}</p>
          </div>
        ))}
      </div>
  
   
    </>
    
    
  );
};

export default Brands;