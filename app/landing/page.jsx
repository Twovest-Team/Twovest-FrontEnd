"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { genders } from "@/constants";
import { useAppDispatch } from "@/redux/hooks";
import { updateGender } from "@/redux/slices/genderSlice";
import womenModel from "@/public/images/landing_page/landing_mulher.png";
import menModel from "@/public/images/landing_page/landing_homem.png";
import getGender from "@/utils/getGender";
import Button from "@/components/buttons/Button";
import { useState } from "react";
import { onboardingData } from "@/constants";

// Se utilizador já tem um género selecionado deve ser redirecionado para a homepage
export default function Landing() {

  const router = useRouter();
  const dispatch = useAppDispatch(state => state.gender)

  function handleClick(id) {
    const genderObj = getGender(id);
    dispatch(updateGender(genderObj));
    router.back();
  }



  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 11; 

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const currentPageData = onboardingData.find((item) => item.page === currentPage);

  return (
    <div className="relative h-[100vh] mt-[-75px] ">
    <div className="rounded-bl-[12%] bg-primary_main h-full w-full"></div>
    <div className="absolute bottom-0 w-full bg-white rounded-tr-[12%] h-[40%]">
      <div className="mx-6 break-words">
        <h5 className="mt-10 mb-4 font-semibold">{currentPageData.titulo}</h5>
        <p className="text-secondary text-justify">{currentPageData.texto}</p>
      </div>
      <div className="justify-between bottom-10 absolute flex w-full px-6 items-center">
        {currentPage > 1 && (
          <>
            <div className="cursor-pointer underline text-primary_main" onClick={previousPage}>
              Página Anterior
            </div>
            <div className="cursor-pointer underline text-primary_main" onClick={nextPage}>
              Próxima Página
            </div>
          </>
        )}
        {currentPage === 1 && (
          <>
            <div className="underline text-primary_main">Saltar</div>
            <Button children={"Começar ->"} onClick={nextPage} />
          </>
        )}
        {currentPage === totalPages && (
          <div className="cursor-pointer underline text-primary_main">Saltar</div>
        )}
      </div>
    </div>
  </div>


    /* <div className="h-full sm:h-[100vh] w-full mx-auto xl:mx-auto pt-0 top-0 mt-[-74px] min-[800px]:mt-0 xl:mt-[-75px]">
      <div className="mx-auto items-center text-center xl:flex my-2 space-y-2 xl:space-y-0 xl:my-0 min-[800px]:flex min-[800px]:w-[780px] min-[800px]:px-1 xl:w-full xl:h-[100vh] ">
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
            <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold capitalize xl:text-[50px]">
              {element.stringPT}
            </h3>
          </button>
        ))}
      </div>
    </div> */
  );
}
