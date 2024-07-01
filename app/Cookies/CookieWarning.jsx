"use client";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useWindow from "@/hooks/client-hooks/useWindow";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function CookieWarning() {
  const searchParams = useSearchParams();
  const warning = searchParams.get("cookiesWarning");
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(warning);
  const { isLg, isXl, is2Xl } = useWindow();
  const handleCloseModal = () => {
    setShowModal(false);
    router.push(pathname);
  };

  return (
    showModal &&
    (isLg || isXl || is2Xl ? (
      <div className="fixed inset-0 flex items-end pb-14 justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className=" mx-28 w-full h-auto px-7 py-7 bg-white rounded-[20px] shadow border border-zinc-200">
          <div className="justify-start items-center gap-[50px] inline-flex">
            <CookieOutlinedIcon
              className="h-10 w-10 text-green-600"
              strokeWidth={1}
            />
            <p className="text-slate-500 text-base leading-snug">
              O nosso website usa cookies. Ao continuares a navegar, estamos a
              assumir a permissão das cookies que está detalhada na nossa página
              de Política de Privacidade.
            </p>
            <button
              className="px-9 py-3.5 bg-emerald-500 rounded-[5px] justify-center items-center gap-2.5 inline-flex focus:outline-none focus:shadow-outline"
              onClick={handleCloseModal}
            >
              <p className="text-white text-base leading-snug">Compreendi</p>
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={handleCloseModal}
            >
              <span className="sr-only">Close</span>
              <CloseOutlinedIcon className="h-6 w-6" stroke="currentColor" />
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="fixed inset-0 flex items-end px-7 py-7 justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className="w-auto h-auto px-4 py-4 bg-white rounded-[20px] shadow border border-zinc-200">
          <div className="justify-center flex-col">
            <div className="justify-end flex pr-2 pb-4">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Close</span>
                <CloseOutlinedIcon className="h-6 w-6" stroke="currentColor" />
              </button>
            </div>
            <div className="flex itmes-center justify-between gap-5">
              <CookieOutlinedIcon
                className="h-10 w-10 text-green-600"
                strokeWidth={1}
              />
              <p className="text-slate-500 text-base leading-snug">
                O nosso website usa cookies. Ao continuares a navegar, estamos a
                assumir a permissão das cookies que está detalhada na nossa
                página de Política de Privacidade.
              </p>
            </div>
            <div className="flex justify-center pt-5 items-end">
              <button
                className="px-9 py-3.5 bg-emerald-500 rounded-[5px] focus:outline-none focus:shadow-outline"
                onClick={handleCloseModal}
              >
                <p className="text-white text-base leading-snug">Compreendi</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
