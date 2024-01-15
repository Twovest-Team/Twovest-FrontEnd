
  // Página do perfil da marca
  // Exemplo: twovest.com/brands/mulher/Nike
  "use client";
  import { useParams } from 'next/navigation';

import { useState, useEffect } from 'react';
import getProductByBrands from '@/utils/db/getProductsByBrand'; 
import Image from 'next/image';
import PriceProduct from '@/components/items/PriceProduct';
import SellIcon from '@mui/icons-material/Sell';


export const revalidate = 0;


const Brand = ( ) => {

  const params = useParams();
  
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data with gender:', 'mulher', 'and brand:', params.brand);
        const productsData = await getProductByBrands(params.gender, params.brand);
        console.log('Products Data:', productsData);
        const productsWithBrands = productsData.filter(product =>
          product.brands && product.brands.id !== null
        );
        setBrandProducts(productsWithBrands);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar produtos da marca.');
        setLoading(false);
      }
    };

    fetchData();
  }, [params.gender, params.brand]);
 
  if (loading) {
    return <p>Aguarde um momento...</p>;
  
  }
  
  if (error || !brandProducts) {
    return <p>{error || 'Erro ao carregar produtos da marca.'}</p>;
  }
  
  if (brandProducts.length === 0) {
    return <p>Não há produtos disponíveis para esta marca.</p>;
  }
  return (
    <>
    

      {brandProducts.map(product => (
        <article key={product.id} className='w-full max-w-[460px] flex-5'>
          <div className="flex flex-col items-center justify-between mx-4">
            <div className={`w-full rounded border-grey border aspect-[3/4] relative flex justify-center items-center`}>
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
                className='object-cover scale-90'
                fill={true}
              />

              <div className='absolute top-2.5 px-4 w-full flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                  <Image
                    src={product.brands.logo_url}
                    width={60}
                    height={60}
                    alt={product.brands.name}
                    className='rounded-full shadow-lg'
                  />
                </div>
              </div>

              {product.discount > 0 && (
                <div className='h-11 bg-primary_main absolute bottom-5 text-white flex items-center gap-2 font-medium px-3.5 rounded-tr rounded-br left-0'>
                  <SellIcon sx={{ fontSize: 20 }} />
                  {product.discount}% OFF
                </div>
              )}
            </div>

            <div className={`flex flex-wrap justify-between items-center mt-4 mb-4 gap-y-1`}>
              <p className='truncate font-semibold w-40'>{product.name}</p>
              <PriceProduct discount={product.discount} offers={product.offers} />
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default Brand;
