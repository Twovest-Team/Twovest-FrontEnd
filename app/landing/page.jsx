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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { OnboardingConclusion } from "@/components/sections/OnboardingConclusion";

// Se utilizador já tem um género selecionado deve ser redirecionado para a homepage
export default function Landing() {
  const router = useRouter();
  const dispatch = useAppDispatch((state) => state.gender);

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

  const handleSkip = () => {
    setCurrentPage(10);
  };

  const currentPageData = onboardingData.find((item) => item.page === currentPage);
  
  const backgroundImageStyle =
  currentPageData.img !== ""
    ? { backgroundImage: `url(${currentPageData.img})` }
    : {
        backgroundColor: "#05CE86",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 30%",
        backgroundImage: `url("https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/twovest_icon.svg")`,
      };


  return (

<div className={`relative h-[100vh] mt-[-75px] w-full ${currentPage >= 10 ? "h-[100vh] mt-[-75px]" : "lg:rounded-[20px] lg:w-[850px] 2xl:w-[1000px] lg:h-[70vh] lg:shadow-2xl lg:mb-40 lg:mt-12 lg:mx-auto"}`}>
  {currentPage !== 10 ? (
    <>
      <div
        id="onboardingImg"
        className={`lg:rounded-[22px] h-full w-full ${currentPageData.img !== "" ? `bg-cover bg-center ` : `bg-primary_main`}`}
        style={backgroundImageStyle}
      ></div>
      <div className="absolute bottom-0 w-full bg-white rounded-tr-[12%] lg:rounded-tr-[0%] h-[40%] lg:rounded-b-[20px]">
        <div className="mx-6 break-words">
          <h5 className="mt-9 mb-3.5 font-semibold">{onboardingData[currentPage - 1].titulo}</h5>
          <p className="text-secondary text-justify">{onboardingData[currentPage - 1].texto}</p>
        </div>
        <div className="justify-between bottom-6 absolute flex w-full px-6 items-center">
          {currentPage > 1 && (
            <>
              <div className="cursor-pointer rounded-full border border-primary_main w-12 h-12 flex items-center justify-center text-primary_main" onClick={previousPage}>
                <ArrowBackIcon />
              </div>
              <div className="cursor-pointer rounded-full border-primary_main bg-primary_main w-12 h-12 flex items-center justify-center text-white" onClick={nextPage}>
                <ArrowForwardIcon/>
              </div>
            </>
          )}
          {currentPage === 1 && (
            <>
              <div className="cursor-pointer underline text-primary_main" onClick={handleSkip}>Saltar</div>
              <Button children={"Começar ->"} onClick={nextPage} />
            </>
          )}
          {currentPage === totalPages && (
            <div className="cursor-pointer underline text-primary_main" onClick={handleSkip}>Saltar</div>
          )}
        </div>
      </div>
    </>
  ) : (
    <OnboardingConclusion />
  )}
</div>

  );
}
