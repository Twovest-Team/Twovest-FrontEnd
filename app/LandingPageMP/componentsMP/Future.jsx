import Image from "next/image"
import HighlightImage from "../photosMP/Highlight.png"
import PhonesImage from "../photosMP/phones.png"


export default function Future () {
    return(
        <div className="flex flex-col items-center pt-[40px] justify-center">
            <div className="rotate-[20deg] pr-[30px] md:pr-[50px] lg:pr-[70px]">
                <Image
                src={HighlightImage}
                alt="Highlight image"
                width={67.03}
                height={73.43}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-[30px] px-[30px] md:px-[50px] lg:px-[70px]">
                <div className="text-center text_h3">
                    Vamos construir o futuro do comércio de vestuário
                </div>
                <div className="h-2 bg-black w-full" />
                <div className="text-center text-secondary leading-snug">
                    A Twovest é um produto que procura trazer a mudança. A mudança, no entanto, não se faz sozinha. 
                    Mas com a colaboração de todos. Prontos para dar o próximo passo?
                </div>
            </div>
            <div className="justify-center items-center pt-6">
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