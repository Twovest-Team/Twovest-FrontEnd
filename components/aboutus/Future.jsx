import Image from "next/image"
import HighlightImage from "@/public/static/images/aboutus/Highlight.png"
import PhonesImage from "@/public/static/images/aboutus/phones.png"


export default function Future () {
    return(
        <div className="flex-col items-end inline-flex pt-[40px] justify-center relative">
            <div className="absolute top-0 right-5">
                <Image
                src={HighlightImage}
                alt="Highlight image"
                width={67.03}
                height={73.43}
                />
            </div>
            <div className="container pb-[50px] pt-4 flex-col justify-center items-center gap-[30px] inline-flex">
                <div className="text-center text_h3">
                    Vamos construir o futuro do comércio de vestuário
                </div>
                <div className="h-2 bg-black w-full" />
                <div className="text-center text-secondary leading-snug">
                    A Twovest é um produto que procura trazer a mudança. A mudança, no entanto, não se faz sozinha. 
                    Mas com a colaboração de todos. Prontos para dar o próximo passo?
                </div>
            </div>
            <div className="flex w-full justify-center relative">
                <Image
                src={PhonesImage}
                alt="Mobile phone screen with a shopping app and multiple products"
                width={334.16}
                height={520}
                className="rounded-md"
                />
            </div>
        </div>
    )
}