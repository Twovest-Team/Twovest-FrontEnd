'use client'

import { useRouter } from "next/navigation"


const BrandGenderButtons = ({currentGender, brandName}) => {

    const router = useRouter()

    function handleGender(selectedGender){
        router.push(`/brands/${selectedGender}/${brandName}`)
    }

    return (

        <div className="flex gap-3 font-semibold [&>button]:border [&>button]:border-white [&>button]:rounded-full [&>button]:px-5 [&>button]:py-2 [&>button]:flex [&>button]:items-center [&>button]:justify-center text-caption">

            <button onClick={() => handleGender('women')} className={`${currentGender === 'women' ? 'bg-white' : 'text-white'}`}>Mulher</button>

            <button onClick={() => handleGender('men')} className={`${currentGender === 'men' ? 'bg-white' : 'text-white'}`}>Homem</button>

            

        </div>


    )
}

export default BrandGenderButtons