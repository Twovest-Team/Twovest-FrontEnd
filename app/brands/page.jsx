// Página do perfil da marca
// Exemplo: twovest.com/brands
"use client";
import { useState, useEffect } from 'react';
import brandsApi from "@/utils/db/getBrands";
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image'
import Link from 'next/link';

export const revalidate = 0;

const Brands = () => {
  const [brand, setBrand] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const brandsData = await brandsApi();
      setBrand(brandsData);
      setFilteredBrand(brandsData);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();


    const filteredBrands = brand.filter(brandItem =>
      brandItem.name.toLowerCase().includes(term)
    );

    setFilteredBrand(filteredBrands);
  };

  if (!brand) {
    return <div>Loading...</div>; // Adapte esta parte conforme necessário
  }

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
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-2 mb-4 justify-between">
        {filteredBrand.map((brandItem, index) => (
          <div key={index} className="flex flex-col items-center justify-between mx-4">
            <div className={`mt-4 w-full h-48 bg-white rounded flex items-center justify-center border`}>
              <Link href={`/brands/mulher/${brandItem.name}`}>
                <Image src={brandItem?.logo_url_without_background} width={144} height={144} alt={brandItem.name} />
              </Link>
            </div>
            <p key={index} className="grid mt-4 justify-center text-center mb-6">{brandItem.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Brands;