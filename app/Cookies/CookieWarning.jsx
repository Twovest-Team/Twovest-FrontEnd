"use client";


import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useState } from "react";
import getCookie from "@/utils/cookies/getCookie";
import setCookie from "@/utils/cookies/setCookie";
import Button from "@/components/buttons/Button";

export default function CookieWarning() {

  const [showModal, setShowModal] = useState(null)

  useEffect(() => {
    async function verifyCookie() {
      const cookie = await getCookie('cookies')
      console.log(cookie)
      setShowModal(!cookie ? true : false)
    }
    
    if (showModal === null) verifyCookie()
  }, [])


  const handleCloseModal = async () => {
    setShowModal(false);
    await setCookie('cookies', '1')
  };

  if (!showModal) return null

  return (
    <>
      <div className="hidden lg:flex fixed inset-0 items-end pb-14 justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className=" mx-28 w-full h-auto p-5 bg-white rounded shadow border border-zinc-200">
          <div className="justify-start items-center gap-[30px] inline-flex">
            <CookieOutlinedIcon
              className="h-10 w-10 text-primary_main"
              strokeWidth={1}
            />
            <p className="text-slate-500 text-base leading-snug">
              O nosso website usa cookies. Ao continuares a navegar, estamos a
              assumir a permissão das cookies que está detalhada na nossa página
              de Política de Privacidade.
            </p>

            <Button onClick={handleCloseModal} type="primary">
            Compreendi
            </Button>

            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={handleCloseModal}
            >
              <span className="sr-only">Close</span>
              <CloseOutlinedIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed inset-0 flex items-end p-5 justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className="w-auto h-auto px-4 py-4 bg-white rounded shadow border border-zinc-200">
          <div className="justify-center flex-col">
            <div className="justify-end flex pr-2 pb-4">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Close</span>
                <CloseOutlinedIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex itmes-center justify-between gap-5">
              <CookieOutlinedIcon
                className="h-10 w-10 text-primary_main"
                strokeWidth={1}
              />
              <p className="text-slate-500 text-base leading-snug">
                O nosso website usa cookies. Ao continuares a navegar, estamos a
                assumir a permissão das cookies que está detalhada na nossa
                página de Política de Privacidade.
              </p>
            </div>
            <div className="flex justify-center pt-5 items-end">
            <Button onClick={handleCloseModal} type="primary">
            Compreendi
            </Button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
