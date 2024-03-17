"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { genders } from "@/constants";
import { useAppDispatch } from "@/redux/hooks";
import { updateGender } from "@/redux/slices/genderSlice";
import getGender from "@/utils/getGender";

// Se utilizador já tem um género selecionado deve ser redirecionado para a homepage
export default function Landing() {
  const router = useRouter();
  const dispatch = useAppDispatch((state) => state.gender);

  function handleClick(id) {
    const genderObj = getGender(id);
    dispatch(updateGender(genderObj));
    router.back();
  }

  return (
    <div className="h-full sm:h-[100vh] w-full mx-auto xl:mx-auto pt-0 top-0 mt-[-74px] min-[800px]:mt-0 xl:mt-[-68px]">
      <div className="mx-auto items-center text-center xl:flex my-2 space-y-2 xl:space-y-0 xl:my-0 min-[800px]:flex min-[800px]:w-[780px] min-[800px]:px-1 xl:w-full xl:h-[100vh] ">
        {genders.map((element) => (
          <button
            aria-label={element.string}
            key={element.id}
            onClick={() => handleClick(element.id)}
            className="relative block transition hover:brightness-[70%] hover:transition hover:ease-in-out hover:delay-300 min-[400px]:mx-auto min-[400px]:w-[350px] min-[800px]:w-[380px] min-[800px]:h-[450px] items-center xl:w-full xl:h-[100vh] xl:mx-[0.05px]"
          >
            <Image
              src={element.image}
              alt={`Modelo ${element.string} da Twovest.`}
              priority
              width={278}
              height={274}
              className="w-screen h-[45vh] xl:w-full min-[400px]:mx-auto min-[400px]:w-[350px]min-[800px]:w-[380px] min-[800px]:h-[450px] xl:h-[100vh]"
            />
            <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold capitalize xl:text-[50px]">
              {element.stringPT}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}
