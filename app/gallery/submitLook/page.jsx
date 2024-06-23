"use client";

import NavigationTitle from "@/components/providers/NavigationTitle";
import { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
import useAuth from "@/hooks/client-hooks/useAuth";
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GavelIcon from '@mui/icons-material/Gavel';
import BrushIcon from '@mui/icons-material/Brush';
import LoadingIcon from "@/components/buttons/icons/LoadingIcon";

const Submit = () => {

  const {currentUser} = useAuth()
  const [timer, setTimer] = useState(5);
  const [galleryMen, setGalleryMen] = useState("Submeter na Galeria Masculina");
  const [galleryWomen, setGalleryWomen] = useState("Submeter na Galeria Feminina");

  useEffect(() => {
    
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        return newTimer >= 0 ? newTimer : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const Loading = (type) =>{
    if(type == 1){
      setGalleryWomen(<LoadingIcon/>);
    }else{
      setGalleryMen(<LoadingIcon/>);
    }
    
  }

  return (
    <>
      {currentUser && ( 
        <>
          <NavigationTitle titleText="Submissão de look" />
          <div className="container mx-auto look overflow-hidden lg:w-[650px]">
            <div className="">
              <div className=" ">
                <div className="">
                  <h1 className="text_h6 mt-4 mb-8 text-center md:text-left">
                    Requisitos para a submissão
                  </h1>
                  <div className=" mb-10 subtitles">
                    <ul className="">
                    
                      <li className="my-5 flex items-center"><div className="p-2.5 bg-black rounded-full mr-3"><GavelIcon className="text-white"/></div> <div>Obrigatório preencher todos os campos que tenham &quot;<span className="text-primary_main font-semibold">*</span>&quot;</div></li>
                      
                      <li className="my-5 flex items-center"><div className="p-2.5 bg-black rounded-full mr-3"><PhotoCameraIcon className="text-white"/></div><div>Tem de conter 1 foto</div></li>
                      
                      <li className="my-5 flex items-center"><div className="p-2.5 bg-black rounded-full mr-3"><BrushIcon className="text-white"/></div>Tem de conter 1 estilo associado</li>
                      
                      <li className="my-5 flex items-center">
                      <div className="p-2.5 bg-black rounded-full mr-3"><CheckroomOutlinedIcon className="text-white"/></div>Uso de 2 ou mais artigos comprados na Twovest
                      </li>
                      
                      <li className="my-5 flex items-center">
                      <div className="p-2.5 bg-black rounded-full mr-3"><VisibilityIcon className="text-white"/></div>Só poderás submeter um novo look após a verificação da
                        Twovest
                      </li>
                      
                    </ul>
                  </div>

                  <div className="text_caption text-secondary">Podes prosseguir em: {timer} segundos</div>
                  <div className="block md:flex mb-12 gap-2">
                  <Button
                  href="submitLook/formLook?gender=women"
                  width="100%"
                  className="mx-auto my-2"
                  disabled={timer > 0}
                  type='black'
                  ariaLabel='Compreendi'
                  onClick={() => Loading(1)}>
                    {galleryWomen}
                  </Button>
                  <Button
                  href="submitLook/formLook?gender=men"
                  width="100%"
                  className="my-2 mx-auto"
                  disabled={timer > 0}
                  type='black'
                  ariaLabel='Compreendi'
                  onClick={() => Loading(2)}>
                    {galleryMen}
                  </Button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      )} 
    </>
  );
};

export default Submit;
