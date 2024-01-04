'use client'

import Image from "next/image";
import ModeloHomem from "@/public/images/landing_page/landing_homem.png";
import ModeloMulher from "@/public/images/landing_page/landing_mulher.png";
import { useRouter } from "next/navigation";
import handleGender from "@/utils/handleGender";

// Se utilizador já tem um género selecionado deve ser redirecionado para a homepage
export default function Landing() {

  const router = useRouter()

  let categories = [
    { gender: 'mulher', image: ModeloMulher },
    { gender: 'homem', image: ModeloHomem },
  ]

  function handleClick(gender){
    handleGender(gender)
    router.push('/')
  }
  
  return (
    <div className="container">
      <div className="flex justify-center flex-wrap my-8 gap-8">

        {categories.map(element => (
          <button onClick={() => handleClick(element.gender)} className="relative">
            <Image
              src={element.image}
              alt="Modelo feminino da Twovest"
              priority
              width={338}
              height={334}
            />
            <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold capitalize">{element.gender}</h3>
          </button>
        ))}

      </div>
    </div>
  );
}
