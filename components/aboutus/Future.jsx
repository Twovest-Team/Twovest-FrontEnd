import Image from "next/image"
import HighlightImage from "@/public/static/images/aboutus/Highlight.png"
import PhonesImage from "@/public/static/images/aboutus/phones.png"


export default function Future() {
    return (
        <div className="flex-col my-40 justify-center relative container">

            <div className="absolute -top-3 right-32 hidden 2xl:block">
                <Image
                    src={HighlightImage}
                    alt="Highlight image"
                    width={67.03}
                    height={73.43}
                />
            </div>

            <div className="pb-[50px] pt-4 flex flex-col justify-center items-center gap-6">
                <h3 className="text-[10vw] sm:text-[38px] md:text-[48px] lg:text-[65px] xl:text-[80px] font-extrabold text-center leading-tight bg-gradient-to-t from-[#666666] w-full to-black inline-block text-transparent bg-clip-text">Vamos construir o futuro do <br className="hidden sm:inline" /> comércio de vestuário</h3>
                <div className="h-1 bg-black w-full max-w-[400px]" />
                <div className="text-caption sm:text-base text-center text-secondary leading-snug max-w-[540px]">
                    A Twovest é um produto que procura trazer a mudança. A mudança, no entanto, não se faz sozinha.
                    Mas com a colaboração de todos. Prontos para dar o próximo passo?
                </div>
            </div>

            <div className="w-[280px] sm:w-[460px] aspect-square mx-auto relative my-20">
                <Image
                    src={PhonesImage}
                    alt="Mobile phone screen with a shopping app and multiple products"
                    fill={true}
                    className="rounded-md object-contain"
                />
            </div>


        </div>
    )
}