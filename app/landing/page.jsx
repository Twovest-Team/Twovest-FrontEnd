"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { genders } from "@/constants";
import { useAppDispatch } from "@/redux/hooks";
import { updateGender } from "@/redux/slices/genderSlice";

// Se utilizador já tem um género selecionado deve ser redirecionado para a homepage
export default function Landing() {

  const router = useRouter();
  const dispatch = useAppDispatch(state => state.gender)

  function handleClick(id) {
    const genderObj = getGender(id);
    dispatch(updateGender(genderObj));
    router.back();
  }

  return (
    <div className="container h-screen">
      <div className="items-start text-center my-2 space-y-2">
        {genders.map((element) => (
          <button
            aria-label={element.string}
            key={element.id}
            onClick={() => handleClick(element.id)}
            className="relative"
          >
            <Image
              src={element.image}
              alt={`Modelo ${element.string} da Twovest.`}
              priority
              width={278}
              height={274}
            />
            <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold capitalize">
              {element.stringPT}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}
