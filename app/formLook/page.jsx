"use client";
import NavigationTitle from '@/components/providers/NavigationTitle';
import { Buttons } from "@/components/buttons/Buttons";
import { useState } from 'react';
import Image from 'next/image';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
export default function formLook() {
    const [disabled, setDisabled] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          setSelectedImage(e.target.result);
        };
  
        reader.readAsDataURL(file);
      }
    };
return (
    <>
         <NavigationTitle titleText="Submissão de look" />
        <form className="container mx-auto overflow-hidden"> 
        <div className="text-center justify-center items-center">
        <label className="block text-gray-700 font-bold mb-2 h-64 border" >
      {selectedImage ? (
  <div className='mt-12 w-auto h-auto flex flex-col items-center'>
 <Image
   src={selectedImage}
   alt="Selected"
   width={48}
   height={48}
   className="h-40 w-40 object-cover  flex mx-auto"
 />
  <div className='flex justify-center mt-2 text-secondary'>
      <input id="image" type="file" onChange={handleFileChange} className="hidden" />
      <p>Alterar foto</p>
    </div>
  </div>
      ) : (
        <div className='mt-32 justify-center bg-text-secondary '>
          <p>Adiciona Imagem Aqui  </p>
          <input id="image" type="file" onChange={handleFileChange} className="hidden" />
          <AddPhotoAlternateIcon className='rotate-90' htmlFor="image" />
        </div>
      )}
    </label>
       
        </div>
        <div className="">
        <label className="block text-secondary-700 font-bold mb-2" >
            Peças usadas*
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary-700 leading-tight focus:outline-none focus:shadow-outline" id="pieces" type="text"  required={true}/>
        </div>
        <div className="">
        <label className="block text-secondary-700 font-bold mb-2">
            Estilo*
        </label>
<div className='shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none'>
  <div className='block text-secondary-700'>
            <select className="bg-white  ">
                          <option value="PT">Choose a country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
</div>
        </div>
        </div>

        <div className="">
        <label className="block text-secondary-700 font-bold mb-2" >
            Link de foto no Instagram
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary-700 leading-tight focus:outline-none focus:shadow-outline" id="instagram" type="text"  required={true}/>
        </div>
 
        <Buttons btnState="disabledMain" text="Submeter" btnSize="mediumSizeSocials" disabled={disabled}/>
      
        </form>
        </>
); 
}