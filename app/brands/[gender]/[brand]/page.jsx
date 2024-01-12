
  // Página do perfil da marca
  // Exemplo: twovest.com/brands/mulher/Nike
  "use client";
  import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import getProductByBrands from '@/utils/db/getProductsByBrand'; 

import Image from 'next/image';


export const revalidate = 0;


const Brand = () => {
  const params = useParams();
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <div className="grid grid-cols-2 col-grid-class-temp mb-4 justify-between">
        {brandProducts.map(product => (
          <div key={product.id}>
            <div key={product.id} className="flex flex-col items-center justify-between mx-4">
              <div className={`mt-4 w-full h-48 bg-white rounded flex items-center justify-center border`}>
               
             
                  <div key={product.id}>
                  {product.images && product.images.length > 0 && (
    <Image src={product.images[0].url} width={144} height={144} alt={product.images[0].alt} />
  )}
                  </div>
              
              </div>
              <p key={product.id} className="grid mt-4 justify-center text-center mb-6">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Brand;