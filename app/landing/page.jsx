'use client'

import Image from "next/image";
import ModeloHomem from "@/public/images/landing_page/landing_homem.png";
import ModeloMulher from "@/public/images/landing_page/landing_mulher.png";
import { useRouter } from "next/navigation";
import handleGender from "@/utils/handleGender";

import getLocalStorage from "@/utils/localStorage/getLocalStorage";

// Se utilizador já tem um género selecionado deve ser redirecionado para a homepage
export default function Landing() {

  const router = useRouter()


  let categories = [
    { gender: 'mulher', image: ModeloMulher },
    { gender: 'homem', image: ModeloHomem },
  ]

  function handleClick(gender){
    handleGender(gender)
    router.back()
  }


      return (
    <div className="container h-screen">
      <div className="items-start text-center my-2 space-y-2">

        {categories.map(element => (
          <button key={element.gender} onClick={() => handleClick(element.gender)} className="relative">
            <Image
              src={element.image}
              alt={`Modelo ${element.gender} da Twovest.`}
              priority
              width={278}
              height={274}
            />
            <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold capitalize">{element.gender}</h3>
          </button>
        ))}

      </div>
    </div>
  );


}
