"use client";


import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import { useEffect, useState } from "react";
import getCookie from "@/utils/cookies/getCookie";
import setCookie from "@/utils/cookies/setCookie";
import Button from "@/components/buttons/Button";
import deleteCookie from "@/utils/cookies/deleteCookie";

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
    await setCookie('cookies', '1')
    setShowModal(false);
  };

  if (!showModal) return null

  return (
    <>
      <div className="hidden lg:flex fixed inset-0 items-end pb-14 justify-center z-50">
        <div className=" mx-28 w-fit h-auto p-5 bg-white rounded shadow border border-zinc-200">
          <div className="justify-start items-center gap-[30px] inline-flex">
            <CookieOutlinedIcon
              sx={{fontSize: 32}}
              className=" text-primary_main"
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

          </div>
        </div>
      </div>

      <div className="lg:hidden fixed inset-0 flex items-end p-5 justify-center z-50 ">
        <div className="w-auto h-auto px-4 py-8 bg-white rounded shadow border border-zinc-200">
          <div className="justify-center flex-col">
            <div className="flex itmes-center justify-between gap-5">
              <CookieOutlinedIcon
                 sx={{fontSize: 32}}
                className="text-primary_main"
                strokeWidth={1}
              />
              <p className="text-slate-500 text-base leading-snug">
                O nosso website usa cookies. Ao continuares a navegar, estamos a
                assumir a permissão das cookies que está detalhada na nossa
                página de Política de Privacidade.
              </p>
            </div>
            <div className="flex justify-center pt-5 items-end">
            <Button width="100%" onClick={handleCloseModal} type="primary">
            Compreendi
            </Button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
