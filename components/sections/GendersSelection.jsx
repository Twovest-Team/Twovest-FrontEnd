"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { genders } from "@/constants";
import { useAppDispatch } from "@/redux/hooks";
import { updateGender } from "@/redux/slices/genderSlice";
import womenModel from "@/public/static/images/landing_page/landing_mulher.png";
import menModel from "@/public/static/images/landing_page/landing_homem.png";
import getGender from "@/utils/getGender";

export const GendersSelection = () =>{

    const router = useRouter();
    const dispatch = useAppDispatch(state => state.gender)
  
    function handleClick(id) {
      const genderObj = getGender(id);
      dispatch(updateGender(genderObj));
      router.back({scroll: 0});
      /* window.scrollTo({ top: 0, behavior: 'smooth' }) */
    }  


    return(
      <div className="h-full sm:h-screen w-full mx-auto xl:mx-auto top-0 min-[800px]:mt-0 ">
      <div className="mx-auto items-center text-center xl:flex my-2 space-y-2 xl:space-y-0 xl:my-0 min-[800px]:flex min-[800px]:w-[780px] min-[800px]:px-1 xl:w-full xl:h-screen ">
        {genders.map((element) => (
          <button
            aria-label={element.string}
            key={element.id}
            onClick={() => handleClick(element.id)}
            className="relative block transition hover:brightness-[70%] hover:transition hover:ease-in-out hover:delay-300 min-[400px]:mx-auto min-[400px]:w-[350px] min-[800px]:w-[380px] min-[800px]:h-[450px] items-center xl:w-full xl:h-[100vh] xl:mx-[0.05px]"
          >
            <Image
              src={(element.id === 0 && womenModel) || (element.id === 1 && menModel)}
              alt={`Modelo ${element.string} da Twovest.`}
              priority
              width={278}
              height={274}
              className="w-screen h-[45vh] xl:w-full min-[400px]:mx-auto min-[400px]:w-[350px]min-[800px]:w-[380px] min-[800px]:h-[450px] xl:h-[100vh]"
            />
            <h1 className="absolute top-1/2 left-1/2 text_h3 -translate-x-1/2 -translate-y-1/2 text-white font-semibold capitalize xl:text-[50px]">
              {element.stringPT}
            </h1>
          </button>
        ))}
      </div>
    </div>
    )
}