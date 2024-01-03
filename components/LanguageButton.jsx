import Image from "next/image";
import PortugalFlag from "@/public/images/portugal_idioma.svg";

export default function LanguageButton() {
  return (
    <button className="w-[67px] h-[33px] px-3 py-2 rounded-[100px] border border-grey justify-start items-center gap-2 inline-flex">
      <div className="w-[17px] h-[17px] justify-center items-center flex">
        <Image src={PortugalFlag} alt="Bandeira de Portugal" width={13} height={13} />
      </div>
      <div className="text-white caption">PT</div>
    </button>
  );
}
