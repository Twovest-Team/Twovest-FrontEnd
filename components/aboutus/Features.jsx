import Image from "next/image"
import CompraImage from "@/public/static/images/aboutus/compra.png"
import PontosImage from "@/public/static/images/aboutus/pontos.png"
import GaleriaImage from "@/public/static/images/aboutus/galeria.png"
import ColecaoImage from "@/public/static/images/aboutus/colecao.png"


export default function Features () {
    return (
        <div id="mainFuncs" className="pt-[50px] flex flex-col items-center">
            <div className="max-w-md mx-auto pl-[30px] justify-center items-center pb-[30px]">
                <h4 className="text_h3 text-center">Principais Funcionalidades</h4>
            </div>
            <div className="flex flex-col justify-center items-center gap-[30px]">
                <div className="items-center justify-center">
                    <div className="p-4 shadow-md rounded-[20px] bg-green-200 justify-center">
                        <Image
                        src={CompraImage}
                        alt="Mobile phone screen with a shopping app and multiple products"
                        width={284}
                        height={520}
                        className="rounded-md"
                        />
                        <h2 className="text-xl text-right body_semibold mt-4">Compra de um artigo</h2>
                    </div>
                </div>
                <div className="items-center justify-center">
                    <div className="p-4 shadow-md rounded-[20px] bg-white">
                        <Image
                        src={PontosImage}
                        alt="Mobile phone screen with a shopping app and multiple products"
                        width={284}
                        height={520}
                        className="rounded-md"
                        />
                        <h2 className="text-xl text-right body_semibold mt-4">Pontos e Cupões</h2>
                    </div>
                </div>
                <div className="items-center justify-center">
                    <div className="p-4 shadow-md rounded-[20px] bg-black">
                        <Image
                        src={GaleriaImage}
                        alt="Mobile phone screen with a shopping app and multiple products"
                        width={284}
                        height={520}
                        className="rounded-md"
                        />
                        <h2 className="text-right font-bold mt-4 text-white">Galeria de Looks</h2>
                    </div>
                </div>
                <div className="items-center justify-center">
                    <div className="p-4 shadow-md rounded-[20px] bg-emerald-500">
                        <Image
                        src={ColecaoImage}
                        alt="Mobile phone screen with a shopping app and multiple products"
                        width={284}
                        height={520}
                        className="rounded-md"
                        />
                        <h2 className="text-xl text-right body_semibold mt-4">Coleções de Looks</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}