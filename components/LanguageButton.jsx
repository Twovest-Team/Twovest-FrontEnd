import Image from "next/image";
import PortugalFlag from "@/public/images/idiomas/portugal_idioma.svg";

export default function LanguageButton(textColor) {
  return (
    <button className="w-16 h-8 px-3 py-2 rounded-[100px] border border-grey justify-start items-center gap-2 inline-flex">
      <div className="w-4 h-4 justify-center items-center flex">
        <Image src={PortugalFlag} alt="Bandeira de Portugal" width={16} height={16} />
      </div>
      <div className={`text-${textColor} caption`}>PT</div>
    </button>
  );
}
